
'use client'
import Nav from './(components)/Nav'
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
 const {push} = useRouter();

  useEffect(()=>{
      const data = localStorage.getItem('usersOb');
         const user = JSON.parse(data);
         if(user?.userId){
          push('/dashboard');
         }
  },[])
      

  return (
    <main className="flex min-h-screen home_component1 flex-col items-center justify-between ">
      <Nav login="login" register="register" />
          
          <div className="home_component  relative min-h-screen flex-col items-center justify-between">
       


                 <div className="home_titles w-full py-[80px] flex flex-col justify-center items-center">
                 <h1 className="defaultFont text-5xl text-center font-black text-white"> Welcome to<br/> Laying Machine </h1>
                  <div className="w-[600px] home_par">
                  <h5 className="defaultFont text-center text-white font-black mt-4">Play & Earn Experience the future of investing with Laying Machine – where you play and earn simultaneously. Unlock a world of financial opportunities through interactive investments on our user-friendly platform. Your journey to financial growth starts with play at Laying Machine</h5>
                     
                    <div className="w-full flex justify-center items-center mt-5">
                    <a href="/login" className="defaultFont p-4 rounded-xl bg-black text-white">Play & Earn</a>
                    </div>
                  </div>
          
                 </div>


          <div className="hu1 absolute bottom-2 left-2">
            <img className="w-[300px] h-[300px]" src='images/huz1.gif' alt="home"/>
          </div>
         
       <div className="flower1"></div>
       <div className="flower"></div>
    
          </div>
    </main>
  )
}
