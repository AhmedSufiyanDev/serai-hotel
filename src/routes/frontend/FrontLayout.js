import React, { Suspense, useState, useEffect} from "react"; 
import Header from '../../container/frontend/layout/header';
import Footer from '../../container/frontend/layout/footer';
import {Loader} from "../../components";
import '../../assets/frontend.scss';
const FrontLayout = (props) => { 
  var url = document.URL.split("/"); 
  return (
    <div>
      {url[3]!='login' && 
          <Header/>
      }
        <div>
          <Suspense fallback={<Loader/>}>
            {props.children}
          </Suspense>
        </div>
        {url[3]!='login' && 
          <Footer/>
        }
    </div>
  );
};
export default FrontLayout;
