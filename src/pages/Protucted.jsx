import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
  const navigate = useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('login');
    if(!login){
      navigate('/')
      alert("Please Login First")
    }
  },[])
  const {Component} = props
  const isAuthenticated = localStorage.getItem('login') === 'true';
  return isAuthenticated ? <Component /> : null;
}

export default Protected

