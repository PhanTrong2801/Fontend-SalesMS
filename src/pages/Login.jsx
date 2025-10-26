import React ,{useState} from "react";
import {useNavigate} from "react-router-dom"
import api from "../api/api"
import { saveAuth } from "../auth/auth"

export default function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            const res = await api.post("/auth/login", {username,password});
            const {token, user} = res.data;
            saveAuth(token, user);
            navigate("/");
        }catch(err){
            setError("Sai tai khoan hoac mat khau!")
        }
    };
    return (
            <div className="login-card"> 
                <h2>Dang nhap</h2>
                <form onSubmit={submit}>
                    <input placeholder="Tai khoan" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input placeholder="Mat Khau" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Dang nhap</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
    )
}