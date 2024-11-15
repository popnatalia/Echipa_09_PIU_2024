
import React from 'react';
import { withRouter } from 'react-router-dom';
const Home = ({ history }) => {
    const handleSignIn = () => {
        history.push('/signin');
    };

    const handleRegister = () => {
        history.push('/register');
    };

    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to our app</h1>
                <p>Please sign in first</p>
                <button onClick={handleSignIn}>Sign In</button>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    );
};

export default withRouter(Home);