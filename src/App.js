import React from 'react';
import { BrowserRouter as Router, Route, Navigate as Redirect, Routes as Switch } from 'react-router-dom';
import Home from "./home/Home";
import Alerts from "./alerts/Alerts";
import CaseManagement from "./case-management/CaseManagement";
import SignInPage from "./login-register/SignIn";
import RegisterPage from "./login-register/Register";
import Dashboard from "./dashboard/Dashboard";
import HealthMonitoring from "./health-monitoring/HealthMonitoring";
import ReportPage from "./report-page/ReportPage";
import WelcomePage from "./login-register/WelcomePage";
import TrainingEvents from "./login-register/TrainingEvents";
const App = () => {
    const defaultRoute = window.location.pathname === '/' ? <Redirect to="/home" /> : undefined;

    return (
        <Router>
            <Switch>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/signin" element={<SignInPage />} />
                <Route exact path="/register" element={<RegisterPage />} />
                <Route exact path="/alerts-and-notifications" element={<Alerts />} />
                <Route exact path="/case-management" element={<CaseManagement />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/health-monitoring" element={<HealthMonitoring />} />
                <Route exact path="/reports-and-feedback" element={<ReportPage />} />
                <Route exact path="/welcome" element={<WelcomePage />} />
                <Route exact path="/log-out" element={<Redirect to="/home" />} />
                <Route exact path="/training-events" element={<TrainingEvents />} />

                <Route path="*" element={<Redirect to="/home" />} /> {/* Fallback for unhandled paths */}
            </Switch>
            {defaultRoute}
        </Router>
    );
};

export default App;
