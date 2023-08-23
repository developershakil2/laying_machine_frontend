'use client'
import Nav from '@/app/(components)/Nav';
import React from 'react';


const AddBalance = ()=>{

    return(
        <div className="home_component1 home_component2">
                        <Nav wallet="wallet" referral="Referral" profile="profile" dashboard="Dashboard" contact="Farm"/>

          
          <div className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                     

                 <div className="w-[350px] mb-3 backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-start text-2xl font-black  text-white">Payment Details</h2>
                    
                <div className="border-[1px] my-2 p-2 bg-black  rounded-xl">
                    <img className="w-[60px] h-[60px]" src="images/bank.png" alt="bank icons"/>
                    <h4 className="font-black text-white">Bank Details</h4>
                    <div className="w-full h-[1px] bg-white "></div>
                    <div className='border-[1px] rounded-lg p-3'>
                        <p className="font-black text-white  p-1">Bank Name : Asia United Bank</p>
                        <div className="w-full h-[1px] bg-white "></div>
                        <p className="font-black text-white  p-1">Account Holder : Vergara Grayson thedore</p>
                        <div className="w-full h-[1px] bg-white "></div>
                        <p className="font-black text-white  p-1">Account : 12345678</p>
                    </div>

                  
                </div>

                

                             

                     </div>
          






                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center text-2xl font-black  text-white">Add Balance</h2>
                    
                               <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Select Your Proof of transaction</span>
                             <input type="file" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>

                             

                            



                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Amount</span>
                             <input type="number" placeholder="Amount"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                            


                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button className="bg-black rounded-xl p-4 text-white">Request To Add balance</button>
                           
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


export default AddBalance;