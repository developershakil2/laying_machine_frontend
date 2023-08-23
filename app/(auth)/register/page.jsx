'use client'
import Nav from '@/app/(components)/Nav';
import React from 'react';



const Register = ()=>{

    return(
        <div className="home_component1 home_component2">
                <Nav login="login" register="register" />
          
          <div className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                     
                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center text-2xl font-black  text-white">Register</h2>
                    
                               <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Select Profile</span>
                             <input type="file" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>

                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">username</span>
                             <input type="text" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Full Name</span>
                             <input type="text" placeholder="Ex: grayson Vergara"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>



                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Phone</span>
                             <input type="number" placeholder="Ex: 128947978676"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Password</span>
                             <input type="password" placeholder="password"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>



                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button className="bg-black rounded-xl p-4 text-white">Create Account</button>
                           
                             </div>

                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                           <p className="flex text-left  text-white">I have already an account <a href="/login" className="ml-2 text-blue-400">Login</a></p>
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


export default Register;