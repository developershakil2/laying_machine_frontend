
import Nav from '@/app/(components)/Nav';
import React from 'react';




const Dashboard = ()=>{

    return(
        <div className="home_component1">
          <div className="h-[70px] bg-[#11111174] flex justify-center items-center w-full pt-3">
          <Nav wallet="wallet" referral="Referral" profile="profile" contact="Farm" />
          </div>
          
          <div className="home_component  relative min-h-screen flex-col items-center justify-between">
            
          <div className="home_component_wrapper  justify-end items-center z-[10] w-full h-[100vh] bg-[#11111174] absolute flex flex-col top-0 left-0">
         
         
         
            <div className="w-[350px] mb-4  rounded-lg p-2">
            <div className="btn_group">
              <a href="/wallet" className="border-[1px] rounded-xl p-3 justify-center flex items-center">
                <img src="images/wallet.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                <span className="text-xl font-black ml-2 text-white">My Wallet</span>
              </a>
              </div>
              <div className="btn_group my-3">
              <a href="/add-balance" className="border-[1px] rounded-xl p-3 justify-center flex items-center">
                <img src="images/peso.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                <span className="text-xl font-black ml-2 text-white">Add Balance</span>
              </a>
              </div>
              <div className="btn_group">
              <a href="/earn" className="border-[1px] rounded-xl p-3 justify-center flex items-center">
                <img src="images/startEarn.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                <span className="text-xl font-black ml-2 text-white">Start Earn</span>
              </a>
              </div>
            </div>
         
         
          <div className="home_component_wrapper_inside mx-auto  rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-4">
                    
                    <div className="transaction_wrapper w-[100%] flex justify-between px-3 items-center flex-row ">
                        <div className="activity_wrap">
                          <h4 className="font-black text-white text-lg ">Activity</h4>
                        </div>
                        <div className="transaction_wrapper">
                           <a href="/wallet" className=" text-white font-black text-lg  flex items-center">transactions <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                        </div>
                    </div>
                  </div> 
               <div className="overflow-y-scroll h-[200px] w-full scrollable-container">
               




                 





                 <div className=" flex justify-center mt-5 items-center flex-col  w-[100%]">
                 <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                    
                    <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                        <div className="trans_wrapper">
                          <img className="w-[50px] h-[50px]" src="images/intrans.png" alt="transactions"/>
                        </div>

                        <div className="trans_wrapper">
                          <h6 className="font-black text-sm text-white">Amount</h6>
                        <h3 className="font-black text-white">$10,879</h3>
                        
                        </div>

                        <div className="trans_wrapper">
                          <span className="text-white">type</span>
                         <div className="flex items-center">
                         <h3 className="text-white font-black">Deposit</h3>
                          <img className="w-[28px] h-[28px]" src="images/done.png" alt="transactions"/>
                       
                         </div>
                        </div>


                        <div className="trans_wrapper">
                           <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                        </div>
                    </div>

                    
                  </div> 




                  <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                    
                    <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                        <div className="trans_wrapper">
                          <img className="w-[50px] h-[50px]" src="images/outtrans.png" alt="transactions"/>
                        </div>

                        <div className="trans_wrapper">
                          <h6 className="font-black text-sm text-white">Amount</h6>
                        <h3 className="font-black text-white">$1079</h3>
                        
                        </div>

                        <div className="trans_wrapper">
                          <span className="text-white">type</span>
                         <div className="flex items-center">
                         <h3 className="text-white font-black">withdraw </h3>
                          <img className="w-[23px] h-[23px]" src="images/pending.png" alt="transactions"/>
                       
                         </div>
                        </div>


                        <div className="trans_wrapper">
                           <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                        </div>
                    </div>

                    
                  </div> 




                  <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                    
                    <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                        <div className="trans_wrapper">
                          <img className="w-[50px] h-[50px]" src="images/intrans.png" alt="transactions"/>
                        </div>

                        <div className="trans_wrapper">
                          <h6 className="font-black text-sm text-white">Amount</h6>
                        <h3 className="font-black text-white">$10879</h3>
                        
                        </div>

                        <div className="trans_wrapper">
                          <span className="text-white">type</span>
                         <div className="flex items-center">
                         <h3 className="text-white font-black">Deposit</h3>
                          <img className="w-[28px] h-[28px]" src="images/cancel.png" alt="transactions"/>
                       
                         </div>
                        </div>


                        <div className="trans_wrapper">
                           <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                        </div>
                    </div>

                    
                  </div> 











                  <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                    
                    <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                        <div className="trans_wrapper">
                          <img className="w-[50px] h-[50px]" src="images/intrans.png" alt="transactions"/>
                        </div>

                        <div className="trans_wrapper">
                          <h6 className="font-black text-sm text-white">Amount</h6>
                        <h3 className="font-black text-white">$10879</h3>
                        
                        </div>

                        <div className="trans_wrapper">
                          <span className="text-white">type</span>
                         <div className="flex items-center">
                         <h3 className="text-white font-black">Deposit</h3>
                          <img className="w-[28px] h-[28px]" src="images/cancel.png" alt="transactions"/>
                       
                         </div>
                        </div>


                        <div className="trans_wrapper">
                           <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                        </div>
                    </div>

                    
                  </div> 










                 </div>




                 </div>



            </div>
         
            
         
          <div className="cloud_bal1 flex justify-center items-center flex-col">
              <p className="font-black">Balance</p>
              <div className="h-[1px] w-[80%] mx-auto bg-black"></div>

              <p className="font-black text-xl">₱0</p>
            </div>
            <div className="cloud_bal2 flex justify-center items-center flex-col">
              <p className="font-black">Referral Bonus</p>
              <div className="h-[1px] w-[80%] mx-auto bg-black"></div>
              <p className="font-black text-xl">₱0</p>
            </div>

          <div className="hu1 absolute bottom-2 left-2">
            <img className="w-[300px] h-[300px] rounded-full" src='images/chickenhello.gif' alt="home"/>
          </div>
        
       <div className="flower1"></div>
       <div className="flower"></div>
    
          </div>
        
        </div>
    )
}



export default Dashboard;