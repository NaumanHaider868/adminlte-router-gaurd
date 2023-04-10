import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protucted(props) {
  const navigate = useNavigate();
  useEffect(()=>{
    let login = localStorage.getItem('login');
    if(!login){
      navigate('/')
    }
  },[])
  const {Component} = props
  return (
    <div><Component/></div>
  )
}

export default Protucted