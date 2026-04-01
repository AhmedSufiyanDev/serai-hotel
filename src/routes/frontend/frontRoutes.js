import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom";
import FrontLayout from "./FrontLayout";
import {
  C_OTC_STORAGE
} from "../../environment";
 
const FrontLayoutRoute = ({render, ...rest}) => {

  const [user] = useState(JSON.parse(localStorage.getItem(C_OTC_STORAGE)));
  const role = user && user.role; 

  return (
    <Route
      {...rest}
      className={'app-logo-text'}
      render={matchProps => {
        return ( 
          <FrontLayout>{render(matchProps)}</FrontLayout> 
        )

      }}
    />
  );
};

export default FrontLayoutRoute;
