import React, { useState, useEffect } from "react";
import { Home, CheckCircle, Plus, Users, Clipboard, MessageCircle, Calendar, Bell, Stethoscope, Settings, LogOut, Edit, Trash } from "lucide-react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const NurseDashboard = ({ username }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({
        petName: "",
        species: "",
        ownerName: "",
        ownerContact: "",
    });
    const [editingPatient, setEditingPatient] = useState(null);

    const API_URL = "http://localhost:8080/api/patients"; // Can be removed if unused
    const API_URL_PATIENTS = "http://localhost:8080/api/patients";
    const API_URL_ASSIGNMENTS = "http://localhost:8080/api/assignments";


    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedVet, setSelectedVet] = useState("");
    const [veterinarians, setVeterinarians] = useState([]);
    const [taskAssignments, setTaskAssignments] = useState([]);
    const [messages, setMessages] = useState([]);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear the token from localStorage
        navigate('/login'); // Redirect to the login page
    };



    useEffect(() => {
        axios.get(API_URL_PATIENTS)
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    // Fetch veterinarians
    useEffect(() => {
        const fetchVeterinarians = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();

                // Filter users with role VETERINARIAN
                const vetUsers = data.filter((user) => user.role === "VETERINARIAN");
                setVeterinarians(vetUsers);
            } catch (error) {
                console.error("Error fetching veterinarians:", error);
            }
        };

        fetchVeterinarians();
    }, []);



    // Fetch tasks
    useEffect(() => {
        axios.get(API_URL_ASSIGNMENTS)
            .then((response) => setTaskAssignments(response.data))
            .catch((error) => console.error("Error fetching task assignments:", error));
    }, []);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/contact");
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await response.json();
                setMessages(data); // Assuming the API returns an array of messages
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);


    const handleAssignTask = (e) => {
        e.preventDefault();
        const assignment = {
            task: newTask,
            patientId: selectedPatient,
            vetId: selectedVet,
        };
        axios.post(API_URL_ASSIGNMENTS, assignment)
            .then((response) => {
                setTaskAssignments([...taskAssignments, response.data]);
                setNewTask("");
                setSelectedPatient("");
                setSelectedVet("");
            })
            .catch((error) => console.error("Error assigning task:", error));
    };

    // Add a new task
    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            const newTaskObj = {
                id: tasks.length + 1,
                description: newTask,
                completed: false,
            };
            setTasks([...tasks, newTaskObj]);
            setNewTask("");
        }
    };

    // Toggle task completion
    const toggleTaskCompletion = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Delete a task
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    useEffect(() => {
        axios.get(API_URL)
            .then((response) => setPatients(response.data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingPatient) {
            setEditingPatient({ ...editingPatient, [name]: value });
        } else {
            setNewPatient({ ...newPatient, [name]: value });
        }
    };

    const handleAddPatient = (e) => {
        e.preventDefault();
        axios.post(API_URL, newPatient)
            .then((response) => {
                setPatients([...patients, response.data]);
                setNewPatient({ petName: "", species: "", ownerName: "", ownerContact: "" });
            })
            .catch((error) => console.error("Error adding patient:", error));
    };

    const handleEditPatient = (patient) => {
        setEditingPatient(patient);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        axios.put(`${API_URL}/${editingPatient.id}`, editingPatient)
            .then(() => {
                setPatients(
                    patients.map((p) =>
                        p.id === editingPatient.id ? editingPatient : p
                    )
                );
                setEditingPatient(null);
            })
            .catch((error) => console.error("Error saving patient:", error));
    };

    const handleDeletePatient = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                setPatients(patients.filter((patient) => patient.id !== id));
            })
            .catch((error) => console.error("Error deleting patient:", error));
    };

    const overviewCards = [
        { title: "Total Patients", value: patients.length },
        { title: "Completed Tasks", value: 15 },
        { title: "Pending Messages", value: 5 },
        { title: "Upcoming Shifts", value: 3 },
    ];

    const menuItems = [
        { icon: <Home />, label: "Dashboard", key: "dashboard" },
        { icon: <Users />, label: "Patient Management", key: "patients" },
        { icon: <Clipboard />, label: "Task List", key: "tasks" },
        { icon: <MessageCircle />, label: "Messages", key: "messages" },
        {
            icon: <LogOut />,
            label: "Logout",
            key: "logout",
            action: handleLogout,
        },
    ];


    const renderPatientManagement = () => (
        <div>
            <h4 className="mb-4">Patient Management</h4>
            <div className="mb-4">
                <form
                    onSubmit={editingPatient ? handleSaveEdit : handleAddPatient}
                >
                    <div className="row g-3">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pet Name"
                                name="petName"
                                value={editingPatient ? editingPatient.petName : newPatient.petName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Species"
                                name="species"
                                value={editingPatient ? editingPatient.species : newPatient.species}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Owner Name"
                                name="ownerName"
                                value={editingPatient ? editingPatient.ownerName : newPatient.ownerName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Owner Contact"
                                name="ownerContact"
                                value={editingPatient ? editingPatient.ownerContact : newPatient.ownerContact}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col-md-12 mt-3">
                            <button type="submit" className="btn btn-primary w-100">
                                {editingPatient ? "Save" : "Add"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pet Name</th>
                            <th>Species</th>
                            <th>Owner Name</th>
                            <th>Owner Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.id}</td>
                                <td>{patient.petName}</td>
                                <td>{patient.species}</td>
                                <td>{patient.ownerName}</td>
                                <td>{patient.ownerContact}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEditPatient(patient)}
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeletePatient(patient.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="row">
                        {overviewCards.map((card, index) => (
                            <div key={index} className="col-lg-3 col-md-6 mb-4">
                                <div className="card shadow-sm h-100 border-0">
                                    <div className="card-body text-center">
                                        <h6 className="text-secondary">{card.title}</h6>
                                        <h4 className="fw-bold">{card.value}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "patients":
                return renderPatientManagement();
            case "tasks":
                return (
                    <div>
                        <h4 className="mb-4">Assign Tasks to Veterinarians</h4>
                        <form onSubmit={handleAssignTask} className="mb-4">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Task Description"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <select
                                        className="form-select"
                                        value={selectedPatient}
                                        onChange={(e) => setSelectedPatient(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Patient</option>
                                        {patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.petName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={selectedVet}
                                        onChange={(e) => setSelectedVet(e.target.value)}
                                        placeholder="Enter Veterinarian Name"
                                        required
                                    />

                                </div>
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Assign Task
                                    </button>
                                </div>
                            </div>
                        </form>
                        <h5 className="mb-3">Assigned Tasks</h5>
                        <ul className="list-group">
                            {taskAssignments.map((assignment, index) => (
                                <li key={index} className="list-group-item">

                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "messages":
                return (
                    <div className="container-fluid messages bg-light py-5">
                        <div className="container py-5">
                            <div className="mx-auto text-center mb-5" style={{ maxWidth: "900px" }}>
                                <h5 className="section-title px-3">User Messages</h5>
                                <h1 className="mb-0">Manage and Reply to Messages</h1>
                            </div>
                            <div className="row g-4">
                                {messages.length > 0 ? (
                                    messages.map((message, index) => (
                                        <div className="col-md-6 col-lg-4" key={index}>
                                            <div className="card border-0 shadow-sm">
                                                <div className="card-header bg-primary text-white">
                                                    <h5 className="mb-0">{message.subject}</h5>
                                                </div>
                                                <div className="card-body">
                                                    <p><strong>Name:</strong> {message.name}</p>
                                                    <p><strong>Email:</strong> {message.email}</p>
                                                    <p><strong>Message:</strong> {message.message}</p>
                                                </div>
                                                <div className="card-footer text-end">
                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleReply(message)}
                                                    >
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center">
                                        <p className="text-muted">No messages available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "logout":
                handleLogout();
            default:
                return <h4>Dashboard</h4>;
        }
    };

    return (
        <div className="d-flex flex-column flex-md-row vh-100 bg-light">
            <div className="bg-white shadow-sm border-end p-3" style={{ minWidth: "250px" }}>
                <div className="d-flex align-items-center border-bottom pb-3 mb-4">
                    <Stethoscope className="me-2 text-primary fs-4" />
                    <h4 className="text-primary m-0">NurseConnect</h4>
                </div>
                <nav>
                    <ul className="list-unstyled">
                        {menuItems.map((item) => (
                            <li key={item.key} className={`mb-2 ${activeTab === item.key ? "bg-primary text-white rounded" : ""}`}>
                                <button className={`btn w-100 text-start ${activeTab === item.key ? "text-white" : "text-dark"}`} onClick={() => setActiveTab(item.key)}>
                                    <span className="me-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex-grow-1 p-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default NurseDashboard;
