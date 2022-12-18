import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../Context/Context';

const PrivetRoute = ({children}) => {
  const {user} = useContext(UserContext);
  if(user.name){
    return children
  }
  return <Navigate to='/'></Navigate>;
};

export default PrivetRoute;