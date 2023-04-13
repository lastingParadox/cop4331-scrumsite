import React, {useState, useEffect, Component} from "react";
import {Helmet} from "react-helmet";
import "./Login.css";

//Complete 100% prototype of login
//Mostly just me playing with react and css


export default function Login(){

   const lightModeLoginBox = {
      border: '2px black',
      width: '50%'
   };

   const usernameBox = <div>
                        <center>
                           <label
                           for="username"><b>Username</b></label>
                           <input  style={lightModeLoginBox} className="login-boxes" type = "text" placeholder = "Enter Username" name = "username"  maxlength = "110" required
                           onChange={(e) => setUsername(e.target.value)}
                           ></input>
                        </center>
                       </div>

   const [password,setPassword] = useState("");
   const [username,setUsername] = useState("");
   const [color,setColor] = useState("black");

   const toggleColor = color => {
      if (color === "white")
         setColor("black");
      else
      {
         setColor("white");
      }
   }

   const button = <button onClick = {
      () => toggleColor(color)
   } >testColorSwitch</button>
   useEffect(() => {
      document.body.style.backgroundColor = color
   },[color])



   return(
      <>
         <h1 className = "login"><center>Login</center>
         </h1>
         <form>
            <div>
               {usernameBox}
            </div>
            
            <div>
               <center>
                  <label for="password"><b>Password</b></label>
                     <input className="login-boxes" type = "password" placeholder = "Enter Password" name = "password"  maxlength = "110" required
                     onChange={(e) => setPassword(e.target.value)}
                     ></input>
               </center>
            </div>
            <div>
               <center>
                  <button type = "submit">Login</button>
               </center>
            </div> 

         </form>

         <div className="white-text"> This is the username being typed {username}</div>
         <div className="white-text"> This is the password being typed {password}</div>
         {button}
      </>
   )


}