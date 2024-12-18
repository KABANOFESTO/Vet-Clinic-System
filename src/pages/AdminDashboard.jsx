import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Users,
  FileText,
  DollarSign,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  MessageCircle,
  Search
} from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logov.png';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [appointments, setAppointments] = useState([]);
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);

  const navItems = [
    { icon: Home, label: 'Dashboard Overview', key: 'dashboard' },
    { icon: Calendar, label: 'Appointments Management', key: 'appointments' },
    { icon: Users, label: 'Staff Management', key: 'staff' },
    { icon: FileText, label: 'Patient Records', key: 'patients' },
    { icon: Package, label: 'Inventory', key: 'inventory' },
    { icon: Settings, label: 'System Settings', key: 'settings' },
  ];
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 8; // Limit to 10 items per page
  const handleDelete = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/delete/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete staff member');
      }
      setStaff((prevStaff) => prevStaff.filter((member) => member.email !== email));
    } catch (err) {
      setError(err.message);
    }
  };
  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (activeSection === 'appointments') {
      fetchAppointments();
    }
  }, [activeSection]);

  // Fetch Staff Data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/all');
        if (!response.ok) {
          throw new Error('Failed to fetch staff data');
        }
        const data = await response.json();
        setStaff(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (activeSection === 'staff') {
      fetchStaff();
    }
  }, [activeSection]);

  // Paginate staff data
  const paginatedStaff = staff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <p>Welcome to the Dashboard!</p>
          </div>
        );
      case 'appointments':
        return (
          <div>
            <h2>Appointments Management</h2>
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Patient</th>
                      <th>Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length > 0 ? (
                      appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>{appointment.id}</td>
                          <td>{appointment.petName}</td>
                          <td>{appointment.appointmentDate}</td>
                          <td>{appointment.reason}</td>
                          <td>{appointment.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No appointments available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 'staff':
        return (
          <div>
            <h2>Staff Management</h2>
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <div>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedStaff.length > 0 ? (
                        paginatedStaff.map((member) => (
                          <tr key={member.id}>
                            <td>{member.username}</td>
                            <td>{member.role}</td>
                            <td>{member.email}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(member.email)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No staff members available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Previous Button */}
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    style={{ width: '45%' }}
                  >
                    Previous
                  </button>

                  {/* Current Page Indicator */}
                  <span className="fw-bold">
                    Page {currentPage} of {Math.ceil(staff.length / itemsPerPage)}
                  </span>

                  {/* Next Button */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage * itemsPerPage >= staff.length}
                    style={{ width: '45%' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        );


      case 'patients':
        return <h2>Patient Records</h2>;
      case 'inventory':
        return (<h2>Inventory Management</h2>);
      case 'settings':
        return <h2>System Settings</h2>;
      case 'support':
        return <h2>Support Center</h2>;
      default:
        return <h2>Welcome to the Admin Dashboard</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="col-2 bg-white shadow">
        <div className="p-4 border-bottom d-flex align-items-center">
          <img
            src={logo}
            alt="Clinic Logo"
            className="me-3"
            style={{ height: '50px' }}
          />
          <h1 className="fs-5 fw-bold">Vet-Admin</h1>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-100 text-start p-3 d-flex align-items-center btn btn-${activeSection === item.key ? 'primary' : 'light'
                }`}
            >
              <item.icon className="me-3" size={20} />
              {item.label}
            </button>
          ))}
          <button
            className="w-100 text-start p-3 d-flex align-items-center btn btn-light text-danger mt-4"
          >
            <LogOut className="me-3" size={20} />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="col-10 d-flex flex-column">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 d-flex justify-content-between align-items-center">
          <div className="position-relative flex-grow-1 me-4">
            <input
              type="text"
              placeholder="Search records, analytics..."
              className="form-control ps-4"
            />
            <Search
              className="position-absolute text-secondary"
              size={18}
              style={{ top: '10px', left: '10px' }}
            />
          </div>

          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-light position-relative">
              <Bell size={20} />
              <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">
                3
              </span>
            </button>

            <button className="btn btn-light">
              <MessageCircle size={20} />
            </button>

            <div className="d-flex align-items-center">
              <img
                src={logo}
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: '40px', height: '40px' }}
              />
              <span>Levis</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-4 bg-light flex-grow-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
