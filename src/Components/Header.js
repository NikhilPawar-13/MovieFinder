
import React from "react";
import MovieIcon from "../MovieIcon.jpg";
import { Redirect } from "react-router";
import {useState} from 'react'
function Header(props) {

  const [flag,setFlage] = useState(false)
  const home = () => {
    setFlage(true)
  };

  if(flag === true){
   
    return <Redirect to = '/'></Redirect>
  }
  return (
    
    <div>
      <table className="titleBar">
        <tbody>
          <tr>
            <td>
              <img width="50" src={MovieIcon} alt="movie" />
            </td>
            <td width="20"></td>

            <td>
              <h1>Movie Finder </h1>
            </td>
            <td width="20"></td>
            <td width="20"></td>
            <td>
              <h3 onClick={home}>Home</h3>             
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Header;
