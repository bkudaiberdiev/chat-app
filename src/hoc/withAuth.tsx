import { Navigate } from "react-router-dom";

function WithAuth(Component: any) {
    const wrappedComponent = (props: any) => {
        const user = localStorage.getItem("user");
        if (user) {
            return <Component {...props} />
        }
        return <Navigate to="signin" />
    }
    return wrappedComponent;
    
}
export default WithAuth;