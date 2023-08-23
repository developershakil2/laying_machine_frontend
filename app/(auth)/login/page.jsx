'use client'
import Nav from '@/app/(components)/Nav';
import React from 'react';



const Login = ()=>{

    return(
        <div className="home_component1 home_component2">
               <Nav login="login" register="register" />
          
          <div className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div id="registerForm" className="home_titles w-full pt-[80px]  flex flex-col justify-center items-center">
                     
                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center pb-8 text-2xl font-black  text-white">Login</h2>
                    

                    

                            


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Phone or username</span>
                             <input type="number" placeholder="phone or username"   className="outline-none w-full placeholder-white px-2 py-3 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Password</span>
                             <input type="password" placeholder="password"   className="outline-none w-full placeholder-white px-2 py-3 rounded-xl border-[1px] bg-transparent"/>
                             </div>



                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button className="bg-black rounded-xl p-4 px-10 text-white">Login </button>
                           
                             </div>

                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                           <p className="flex text-left  text-white">I don't have an acount <a href="/register" className="ml-2 text-blue-500">Register</a></p>
                             </div>

                     </div>
          
                 </div>


          <div className="hu1 absolute bottom-2 left-2">
            <img className="w-[300px] h-[300px]" src='images/huz1.gif' alt="home"/>
          </div>
         
       <div className="flower1"></div>
       <div className="flower"></div>
    
          </div>
        </div>
    )
}


export default Login;