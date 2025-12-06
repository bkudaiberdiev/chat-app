import { useEffect, useState } from "react";
import classes from "./Sidebar.module.scss";
import InputField from "../fields/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState<string>("");
    const user: any  = localStorage.getItem("user");
    const navigate = useNavigate();
    useEffect(() => {
        // Получаем пользователей с json-server
        fetch("http://localhost:3001/users")
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.error(err));
    }, []);


    const [channels, setChannels] = useState<any>([]);
    const [channelName, setChannelName] = useState("");

    // Получаем каналы при загрузке
    useEffect(() => {
        axios.get("http://localhost:3001/channels")
        .then(res => setChannels(res.data))
        .catch(err => console.error(err));
    }, []);

  const handleCreateChannel = async () => {
    if (!channelName) return;
    try {
      const res = await axios.post("http://localhost:3001/channels", {
        name: channelName,
      });

      setChannels((prev: any) => [...prev, res.data]);
      setChannelName(""); // очистка поля ввода
    } catch (err) {
      console.error(err);
      alert("Ошибка создания канала");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin")
  }
  const filteredChannels = channels?.filter((channel: any) => channel.name?.toLowerCase().includes(search.toLowerCase()))
    return (
        <div className={classes.sidebar}>
            <InputField
                type="text"
                label="Название канала"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
            />
            <button className="global_btn" onClick={handleCreateChannel}>Создать канал</button>
            <InputField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <ul>
                {filteredChannels.map((channel: any) => {
                    return (
                        <li key={channel.id}>
                            {channel.name}
                        </li>
                    )
                })}
            </ul>
            <button
              onClick={handleLogout} 
              className="global_btn"
              style={{ background: "lightgrey", position: "absolute", bottom: "20px", color: "red"}}>
              Выйти
            </button>
        </div>
    )
}

export default Sidebar;