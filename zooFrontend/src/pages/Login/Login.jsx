import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8083/api/auth/login', {
                username,
                password
            });

            if (response.data.accessToken) {
                const token = response.data.accessToken;
                localStorage.setItem('accessToken', token);

                const decoded = jwtDecode(token);
                console.log('Dekodowany token:', decoded);

                switch (decoded.role) {
                    case 'VETERINARIAN':
                        navigate('/veterinarian/dashboard');
                        break;
                    case 'ADMIN':
                        navigate('/admin/dashboard');
                        break;
                    case 'DIRECTOR':
                        navigate('/director/dashboard');
                        break;
                    case 'REGISTRAR':
                        navigate('/registrar/dashboard');
                        break;
                    case 'CAREGIVER':
                        navigate('/caregiver/dashboard');
                        break;
                    default:
                        navigate('/'); // fallback
                }

                setMessage('Zalogowano pomyślnie!');
            } else {
                setMessage('Błąd logowania');
            }
        } catch (error) {
            console.error('Błąd logowania:', error);
            setMessage('Wystąpił błąd');
        }
    };

    return (
        <div className="flex flex-col bg-white max-w-sm h-[330px] mx-auto my-32 text-center border border-dark rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl mb-6">Zaloguj się</h1>
            <form onSubmit={handleLogin} className="w-2/3 mx-auto flex flex-col gap-4">
                <div className="flex flex-col">
                    <label className="text-left ml-2">Login</label>
                    <input
                        type="text"
                        className="border border-dark rounded-md p-1"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-left ml-2">Hasło</label>
                    <input
                        type="password"
                        className="border border-dark rounded-md p-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#2b6cb0] rounded-md p-2 text-white hover:bg-[#2c5282] transition-all duration-250 shadow-md"
                >
                    Zaloguj
                </button>
                {message && (
                    <p className="text-red-500">{message}</p>
                )}
            </form>
        </div>
    );
};

export default Login;

