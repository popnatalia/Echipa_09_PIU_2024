import React from 'react';
import { BrowserRouter as Router, Route, Navigate as Redirect, Routes as Switch} from 'react-router-dom';
import Home from "./home/Home";
import Alerts from "./alerts/Alerts";
import CaseManagement from "./case-management/CaseManagement"
import SignInPage from "./login-register/SignIn";
import RegisterPage from "./login-register/Register";
import Dashboard from "./dashboard/Dashboard";
import HealthMonitoring from "./health-monitoring/HealthMonitoring";

const App = () => {
    const defaultRoute = window.location.pathname === '/' ? <Redirect to="/home"/> : undefined;
    return (
        <Router>
            <Switch>
                <Route exact path="/home" element={<Home/>} />
                <Route exact path="/signin" element={<SignInPage/>} />
                <Route exact path="/register" element={<RegisterPage/>} />
                <Route exact path="/alerts-and-notifications" element={<Alerts/>} />
                <Route exact path="/case-management" element={<CaseManagement/>} />
                <Route exact path="/dashboard" element={<Dashboard/>} />
                <Route exact path="/health-monitoring" element={<HealthMonitoring/>} />
                <Route exact path={"/log-out"} element={<Redirect to="/home"/>} />
            </Switch>
            {defaultRoute}
        </Router>
    );
};

export default App;
