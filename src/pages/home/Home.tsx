import Message from "../../components/message/Message";
import Sidebar from "../../components/sidebar/Sidebar";
import UserInfo from "../../components/user-info/User-info";
import WithAuth from "../../hoc/withAuth";
import classes from "./Home.module.scss";

function Home() {
    return (
        <div className={classes.home}>
           <Sidebar />
           <Message />
           <UserInfo />
        </div>
    )
}
export default WithAuth(Home);