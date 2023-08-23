
import Nav from '@/app/(components)/Nav';
import React from 'react';



const Contact = ()=>{


    return(
        <>
           <div className="home_component1">
           <Nav dashboard="dashboard" wallet="wallet" referral="Referral" profile="profile" />
     
          
          <div className="home_component  relative min-h-screen flex-col items-center justify-between">
       


               

          <div className="hu1 absolute bottom-2 left-2">
            <img className="w-[300px] h-[300px] rounded-full" src='images/red-chicken.gif' alt="home"/>
          </div>
        
       <div className="flower1"></div>
       <div className="flower"></div>
    
          </div>
        
        </div>
        
        </>
    )
}


export default Contact;