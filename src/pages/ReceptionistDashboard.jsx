import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReceptionistDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [newPatient, setNewPatient] = useState({
        name: '',
        contact: '',
        reason: '',
        doctor: ''
    });

    const overviewCards = [
        { title: "Today's Appointments", value: 42, color: "primary" },
        { title: "Check-Ins Pending", value: 12, color: "warning" },
        { title: "New Registrations", value: 7, color: "success" },
        { title: "Messages", value: 5, color: "info" },
    ];

    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewPatientSubmit = (e) => {
        e.preventDefault();
        console.log('New Patient Registration:', newPatient);
        setNewPatient({
            name: '',
            contact: '',
            reason: '',
            doctor: ''
        });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <>
                        <div className="row g-3">
                            {overviewCards.map((card, index) => (
                                <div className="col-md-3" key={index}>
                                    <div className={`card border-${card.color} text-${card.color} h-100`}>
                                        <div className="card-body">
                                            <h5 className="card-title">{card.title}</h5>
                                            <p className="card-text display-6">{card.value}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <div className="card">
                                <div className="card-header">Quick Patient Registration</div>
                                <div className="card-body">
                                    <form onSubmit={handleNewPatientSubmit}>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                placeholder="Patient Name"
                                                value={newPatient.name}
                                                onChange={handleNewPatientChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="contact"
                                                placeholder="Contact Number"
                                                value={newPatient.contact}
                                                onChange={handleNewPatientChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="reason"
                                                placeholder="Reason for Visit"
                                                value={newPatient.reason}
                                                onChange={handleNewPatientChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="doctor"
                                                placeholder="Preferred Doctor"
                                                value={newPatient.doctor}
                                                onChange={handleNewPatientChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Register Patient</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'appointments':
                return (
                    <div className="card">
                        <div className="card-header">Appointments</div>
                        <div className="card-body">
                            <p>Here you can manage and view all appointments.</p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="petName" className="form-label">Pet Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="petName"
                                        placeholder="Enter your pet's name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ownerName" className="form-label">Owner Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ownerName"
                                        placeholder="Enter owner's name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="appointmentDate" className="form-label">Appointment Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="appointmentDate"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reason" className="form-label">Reason for Visit</label>
                                    <textarea
                                        className="form-control"
                                        id="reason"
                                        rows="3"
                                        placeholder="Briefly describe the reason for the visit"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Book Appointment</button>
                            </form>
                        </div>
                    </div>

                );
            case 'patient registration':
                return (
                    <div className="card">
                        <div className="card-header">Patient Registration</div>
                        <div className="card-body">
                            <p>Form for registering new patients is available on the dashboard.</p>
                        </div>
                    </div>
                );
            case 'call logs':
                return (
                    <div className="card">
                        <div className="card-header">Call Logs</div>
                        <div className="card-body">
                            <p>View recent call logs here.</p>
                            {/* Add functionality for managing call logs */}
                        </div>
                    </div>
                );
            case 'messages':
                return (
                    <div className="card">
                        <div className="card-header">Messages</div>
                        <div className="card-body">
                            <p>Check and reply to messages.</p>
                            {/* Add messaging functionality */}
                        </div>
                    </div>
                );
            case 'support':
                return (
                    <div className="card">
                        <div className="card-header">Support</div>
                        <div className="card-body">
                            <p>Get help and support here.</p>
                            {/* Add support functionality */}
                        </div>
                    </div>
                );
            default:
                return <p>Select a menu to view its content.</p>;
        }
    };

    return (
        <div className="d-flex vh-100 bg-light">
            {/* Sidebar */}
            <div className="bg-white border-end" style={{ width: '250px' }}>
                <div className="text-center py-4 border-bottom">
                    <h1 className="h4">HealthDesk</h1>
                </div>
                <nav className="nav flex-column p-3">
                    {['Dashboard', 'Appointments', 'Patient Registration', 'Call Logs', 'Messages', 'Support'].map((label, index) => (
                        <button
                            key={index}
                            className={`btn text-start mb-2 w-100 ${activeTab === label.toLowerCase() ? 'btn-primary' : 'btn-light'}`}
                            onClick={() => setActiveTab(label.toLowerCase())}
                        >
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 overflow-auto">
                <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                    <h2 className="h5">Receptionist Dashboard</h2>
                </header>

                <main className="p-4">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default ReceptionistDashboard;
