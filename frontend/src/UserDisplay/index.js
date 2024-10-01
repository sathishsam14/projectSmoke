
import React, { useState } from 'react';
import './index.css';

const UserDisplay = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [users, setUsers] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, address }),
        });

        if (response.ok) {
            alert('User added successfully');
            setName('');
            setAddress('');
        } else {
            alert('Error adding user');
        }
    };

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
    };

    const toggleTable = () => {
        if (!showTable) {
            fetchUsers();
        }
        setShowTable(!showTable);
    };

    return (
        <div className="user-container">
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>

            <button onClick={toggleTable}>
                {showTable ? 'Hide Table' : 'View Table'}
            </button>

            {showTable && (
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserDisplay;
