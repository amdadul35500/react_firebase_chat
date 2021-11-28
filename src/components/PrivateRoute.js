import React from 'react';
import { useGlobalContext } from '../context/context';
import Login from '../pages/Login';
import Home from '../pages/Home';

const PrivateRoute = ({children}) => {
    const user = useGlobalContext();

    return user ? <Home/> : <Login/>;
}

export default PrivateRoute
