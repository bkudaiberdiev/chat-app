import classes from "./User-info.module.scss";
import { avatar } from "../../assets";

function UserInfo() {
    const user: any = localStorage.getItem("user")
    const parsedUser = JSON.parse(user)
    return (
        <div className={classes.user_info}>
            <img className={classes.user_info_av} src={avatar} />
            <h4>{parsedUser.name}</h4>
            <span>{parsedUser.email}</span>
        </div>
    )
}

export default UserInfo;