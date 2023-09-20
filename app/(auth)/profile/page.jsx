'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';


const Profile = ()=>{
   const {push} = useRouter()
    const [user ,setUser] = useState('');
     useEffect(()=>{
         const data = localStorage.getItem('usersOb');
         setUser(JSON.parse(data));
     },[]);

     const logOut = ()=>{
            localStorage.clear();
            push('/login');
            alert('logout successfully');
     }

    return(
        <>
        
     {
      user?.userId ?    <div className="home_component1">
      <Nav dashboard="dashboard" wallet="wallet" referral="Referral"  contact="Farm" />
   
        <div className="home_component  relative min-h-screen flex-col items-center justify-between">
     

        <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                   
                   <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                             <h2 className="w-full text-center text-2xl font-black  text-white">profile <span className="text-xl">💎</span></h2>
                  
                             <div className="w-full flex justify-center items-center rounded-xl py-2 ">
                          <img className="w-[160px] h-[160px] rounded-full" src={user.userprofile} alt="shakil"/>
                           </div>
                           <div className="w-full rounded-xl py-2 ">
                             <input value={`phone : ${user.userphone}`} type="text"   className="outline-none w-full placeholder-white text-white font-black px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                           </div>
                           <div className="w-full rounded-xl py-2 ">
                             <input value={`username : ${user.username}`} type="text"   className="outline-none w-full placeholder-white text-white font-black px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                           </div>
                           <div className="w-full rounded-xl py-2 ">
                             <input type="text" value={`Full Name : ${user.fullName}`}   className="outline-none w-full placeholder-white text-white font-black px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                           </div>

                           <div className="w-full rounded-xl py-2 ">
                             <input type="text" value={`joined : ${new Date(user.userCreatedAt).toString()}`}  className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                           </div>

                          

                           



                           <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                           <button onClick={logOut} className="bg-black rounded-xl p-4 text-white">Logout</button>
                         
                           </div>

                         


                   </div>
        
               </div>

             

        <div className="hu1 absolute bottom-2 left-2">
          <img className="w-[300px] h-[300px] rounded-full" src='images/chickenhello.gif' alt="home"/>
        </div>
      
     <div className="flower1"></div>
     <div className="flower"></div>
  
        </div>
      
      </div>:''
     }
        </>
    )
}



export default Profile;