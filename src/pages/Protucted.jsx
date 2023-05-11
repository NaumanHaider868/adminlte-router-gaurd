
import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        }
        // setIsLoggedIn(true);
        // navigate("/orders");
    }

    const checkExpireToken = () => {
        const userExpireToken = localStorage.getItem('token');
        if (!userExpireToken || userExpireToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/');
        }
        // setIsLoggedIn(true);
        // navigate("/orders");
    }



    useEffect(() => {
            checkExpireToken();
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <>
            <Component />
        </>
    );
}
export default Protected;