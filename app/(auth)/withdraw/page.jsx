'use client'
import Nav from '@/app/(components)/Nav';
import React from 'react';


const Withdraw = ()=>{

    return(
        <div className="home_component1 home_component2">
                        <Nav wallet="wallet" referral="Referral" profile="profile" dashboard="Dashboard" contact="Farm" />

          
          <div className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                     







                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center text-2xl font-black  text-white">Withdraw Funds</h2>
                 
                               <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Bank Name</span>
                             <input type="text" placeholder="Bank Name"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Bank account Holder Name</span>
                             <input type="text" placeholder="Bank account Holder Name"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>

                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Bank Account Number</span>
                             <input type="number" placeholder="Bank Account Number"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Amount</span>
                             <input type="number" placeholder="Amount"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                            


                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button className="bg-black rounded-xl p-4 text-white">Request For Withdraw</button>
                           
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


export default Withdraw;