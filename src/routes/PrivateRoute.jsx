import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if(loading) {
        return <span className="loading loading-dots loading-xl"></span>
    }

    if(user) {
        return children;
    }

    return (
        <Navigate to='/login'></Navigate>
        /*
        ekhane bola hocche je 
        jodi user thake, tahole children return koro
        ar na thakle /login route e chole jao
        */
    );
};

export default PrivateRoute;