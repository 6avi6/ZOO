import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {login} from "../../services/authService";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const success = await login(username, password);

            if (success) {
                navigate('/');
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
                <button type="submit" className="bg-[#526C43] rounded-md p-2 text-white hover:bg-[#234228] transition-all duration-250 shadow-md">
                    Zaloguj
                </button>
                {message && <p className="text-red-500">{message}</p>}
            </form>
        </div>
    );
};

export default Login;
