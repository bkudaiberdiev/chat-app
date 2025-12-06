import InputField from "../../components/fields/InputField";
import classes from "./Auth.module.scss";

function Signup() {
    return (
        <div style={{'display': 'flex'}}>
            <form className={classes.auth}>
                <h3 className={classes.auth_title}>Зарегистрироваться</h3>
                <InputField label="Логин" />
                <InputField label="Пароль" />
                <InputField label="Повторить Пароль" />
            </form>
        </div>
    )
}

export default Signup;