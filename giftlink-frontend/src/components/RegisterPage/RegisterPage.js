import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import { useAppContext } from '../../context/AuthContext';
import './RegisterPage.css';

function RegisterPage() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');          // renommé pour Task 6

    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    const handleRegister = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })
            });

            const json = await response.json();          // Task 1: accès aux données JSON

            if (json.authtoken) {
                // Task 2: Sauvegarder les détails utilisateur en session
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);

                setIsLoggedIn(true);                     // Task 3: mettre à jour le statut de connexion
                navigate('/app');                        // Task 4: rediriger vers MainPage
            }

            if (json.error) {
                setShowerr(json.error);                  // Task 5: message d'erreur si échec
            }

        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="register-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Register</h2>

                        {/* First Name input */}
                        <div className="mb-4">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        {/* Last Name input */}
                        <div className="mb-4">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                className="form-control"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        {/* Email input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Task 6: Affichage du message d'erreur */}
                        <div className="text-danger">{showerr}</div>

                        {/* Register button */}
                        <button
                            className="btn btn-primary w-100 mb-3"
                            onClick={handleRegister}
                        >
                            Register
                        </button>

                        <p className="mt-4 text-center">
                            Already a member? <Link to="/app/login" className="text-primary">Login</Link>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;