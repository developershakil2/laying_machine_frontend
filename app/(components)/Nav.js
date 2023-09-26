
'use client'
import React, {useState} from 'react';

const Nav = ({dashboard, wallet, profile, referral, contact, login , register})=>{

    const [navOpen, setNavOpen] = useState('');


    return(

        <>
        <div className="w-full h-[70px]  flex items-center justify-center">
              <div className="container mx-auto flex justify-between items-start">
                     <div className="left_nav flex justify-center items-center">
                          <img src="images/logo.gif" alt="logo" className="w-[55px] mr-3 rounded-full h-[55px]"/>  <a className="font-black text-2xl text-white defaultFont"  href="/"><h2>Laying Machine</h2></a>
                     </div>
                     <button onClick={()=> setNavOpen('flex')} className="outline-none mobile_btn mr-4 "><img className="rounded-full h-[45px] w-[45px]" src="images/nav.png" alt="navclose"/></button>
                    {
                        login?  <div style={{display:navOpen}} className="nav_right h-[70px] flex justify-end items-center">
                        <div className="w-full mobile_btn flex justify-end items-center my-8 h-[30px]">
                          <button onClick={()=> setNavOpen('none')} className="outline-none mr-4 "><img className="rounded-full h-[45px] w-[45px]" src="images/navclose.png" alt="navclose"/></button>
                        </div>
                     <a className="bg-black p-4 rounded-lg text-white" href="/">Home</a>
                     <a className="bg-black p-4 rounded-lg mx-4 text-white" href="/login">{login}</a>
                     <a className="bg-black p-4 rounded-lg text-white" href="/register">{register}</a>
                 
                  </div>: <div style={{display:navOpen}} className="nav_right h-[70px] flex justify-end items-center">
                        <div className="w-full mobile_btn flex justify-end items-center my-8 h-[30px]">
                          <button onClick={()=> setNavOpen('none')} className="outline-none mr-4 "><img className="rounded-full h-[45px] w-[45px]" src="images/navclose.png" alt="navclose"/></button>
                        </div>
               
                 {
                    !dashboard ? "": <a className="bg-black p-4 rounded-lg mx-3 text-white" href="/dashboard">{dashboard}</a>
                 }
                  {
                    !wallet ? "": <a className="bg-black p-4 rounded-lg mx-4 text-white" href="/wallet">{wallet}</a>
                  }
                 
                    {
                        !profile ? '': !referral ? <a className="bg-black p-4 rounded-lg mr-3 text-white" href="/profile">{profile}</a>:<a className="bg-black p-4 rounded-lg text-white" href="/profile">{profile}</a>
                    }
                    {
                        !referral? "": <a className="bg-black p-4 rounded-lg mx-3 text-white" href="/referral">{referral}</a>
                    }
                     {
                        !contact ? "":<a className="bg-black p-4 rounded-lg text-white" href="/farm">{contact}</a>
                     }
                 
                  </div>
                    }
              </div>
        </div>
        
        </>
    )
}

export default Nav;