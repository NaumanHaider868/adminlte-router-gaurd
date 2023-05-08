// import React, { useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom';

// function Protected(props) {

//   const navigate = useNavigate();
//   const location = useLocation();

//   // useEffect(() => {
//   //   let login = localStorage.getItem('login');
//   //   if (!login) {
//   //     navigate('/')
//   //     alert("Please Login First")
//   //   }
//   // }, [])



//   useEffect(() => {
//     let login = localStorage.getItem('login');
//     if (!login) {
//       sessionStorage.setItem('prevUrl', location.pathname);
//       navigate('/')
//       alert("Please Login First")
//     }
//   }, [location.pathname, navigate])

//   const { Component } = props
//   const isAuthenticated = localStorage.getItem('login') === 'true';

//   return isAuthenticated ? <Component /> : null;
// }

// export default Protected


// import React, { useEffect, useState } from "react";
// import { Route, useNavigate } from "react-router-dom";
// const Protected = (props) => {
//     const {Component} = props;
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
    

//     const checkExpireToken = () => {
//         const userExpireToken = localStorage.getItem('token');
//         if (!userExpireToken || userExpireToken === 'undefined') {
//             setIsLoggedIn(false);
//             return navigate('/');
//         }
//         setIsLoggedIn(true);
//     }



//     useEffect(() => {
//             checkExpireToken();
//         }, [isLoggedIn]);
//     return (
//         <>
//             <Component />
//         </>
//     );
// }
// export default Protected;