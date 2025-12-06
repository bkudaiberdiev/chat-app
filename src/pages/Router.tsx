import {Routes, Route} from "react-router-dom";
import Home from "./home/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    )
}

export default Router;