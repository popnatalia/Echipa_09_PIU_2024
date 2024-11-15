
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Home';
import SignIn from './SingIn';
import Register from './Register';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signin" component={SignIn} />
                <Route path="/register" component={Register} />
            </Switch>
        </Router>
    );
};

export default App;
