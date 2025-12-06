import {useState} from "react";
import InputField from "../../components/fields/InputField";
import classes from "./Auth.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function Signin() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");        
    const navigate = useNavigate();

    const handleLogin = async (event: any) => {
        event.preventDefault();
        if (!username) return setError("Введите username");
        try {
        const res = await axios.post("http://localhost:3001/login", { username });
        localStorage.setItem("user", JSON.stringify(res.data))
        toast.success("Вход совершен")
        navigate("/")
        } catch (err: any) {
        toast.error(err.response.data.error)
        return err?.message
        }
    };

    return (
        <div style={{'display': 'flex'}}>
            <form onSubmit={handleLogin} className={classes.auth}>
                <h3 className={classes.auth_title}>Войти</h3>
                <InputField
                    label="Логин"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            
                <button className="global_btn" style={{ width: "100%"}} type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Signin;