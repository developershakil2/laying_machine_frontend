'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Api } from '@/app/Api';



const Wallet = ()=>{
  const {Suser} = useContext(Api)
  const [user ,setUser] = useState('');
  useEffect(()=>{
      const data = localStorage.getItem('usersOb');
      setUser(JSON.parse(data));
  },[]);

  const [reData, setRedata] = useState('');
  const [trans , setTrans] = useState('');
  const [balance, setBalance] = useState(null);
  const [refBal, setRefBal] = useState(null);


  const [getUserId, setGetUserId] = useState(null);
  const [currentUserId , setCurrentUserId] = useState(null);
     console.log(Suser, "balance");
     console.log(currentUserId, 'current user id is here');

     useEffect(()=>{
      const getuserBalnce = async ()=>{
        try{
        const response = await axios.get(`https://layingmachine.onrender.com/getuniqueuser/${getUserId}`);
              if(response.status == 200){
                setCurrentUserId(response.data.user);
              }
        }catch(error){
                 console.log("api error")
        }
      }
      getuserBalnce();
     },[getUserId])



  useEffect(()=>{
    const storedData = localStorage.getItem('usersOb');
    const data = JSON.parse(storedData);
    setGetUserId(data?.userId);
    const ub = typeof data?.userBal === 'number' ? data.userBal.toFixed(2) : '0.00';
    const rb = typeof data?.refBal === 'number' ? data.refBal.toFixed(2) : '0.00';
    setRefBal(rb);
     setBalance(ub);
     axios.get(`https://layingmachine.onrender.com/getuni/${data?.userId}`).then((res)=>{
           setTrans(res.data.reverse());
     }).catch((err)=>{
        console.log(err);
     })

     axios.get(`https://layingmachine.onrender.com/login/${data.userphone}`).then((res)=>{
        setRedata(res.data)
}).catch((err)=>{
console.log(err)
})
 },[]);

    return(
        <>
      {
        user?.userId ? <div className="home_component1">
        <div className="h-[70px] bg-[#11111174] flex justify-center items-center w-full pt-3">
                  <Nav dashboard="dashboard" referral="Referral" profile="profile" contact="Farm" />
                  </div>
                  <div className="home_component  relative min-h-screen flex-col items-center justify-between">
               
                  <div className="home_component_wrapper  justify-end items-center z-[10] w-full h-[100vh] bg-[#11111174] absolute flex flex-col top-0 left-0">
                 
                    <div className="w-[350px] mb-4  rounded-lg p-3">
                    <div className="btn_group">
                      <a href="/farm" className="border-[1px] rounded-xl p-3 justify-center flex items-center">
                        <img src="images/startEarn.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                        <span className="text-xl font-black ml-2 text-white">Start Earn</span>
                      </a>
                      </div>
                    <div className="btn_group mt-3">
                      <a href="/dashboard" className="border-[1px]  rounded-xl p-3 justify-center flex items-center">
                        <img src="images/dashboard.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                        <span className="text-xl font-black ml-2 text-white">Dashboard</span>
                      </a>
                      </div>
                      <div className="btn_group my-3">
                      <a href="/withdraw" className="border-[1px] rounded-xl p-3 justify-center flex items-center">
                        <img src="images/withdraw.png" alt="earning image"  className=" w-[35px] h-[35px] "/>
                        <span className="text-xl font-black ml-2 text-white">Withdraw</span>
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
                       
        
                 {
                trans && trans?.map((element , indx)=>(
                  
                   <>
                     {
                      element.type === 'deposit'?   <div key={indx} className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                  
                      <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                          <div className="trans_wrapper">
                            <img className="w-[50px] h-[50px]" src="images/intrans.png" alt="transactions"/>
                          </div>
    
                          <div className="trans_wrapper">
                            <h6 className="font-black text-sm text-white">Amount</h6>
                          <h3 className="font-black text-white">{element.amount}</h3>
                          
                          </div>
    
                          <div className="trans_wrapper">
                            <span className="text-white">type</span>
                           <div className="flex items-center">
                           <h3 className="text-white font-black">{element.type}</h3>
                           {
                            element.status === 'pending' ? <img className="w-[23px] h-[23px]" src="images/pending.png" alt="transactions"/> : element.status === 'rejected' ? <img className="w-[28px] h-[28px]" src="images/cancel.png" alt="transactions"/> : <img className="w-[28px] h-[28px]" src="images/done.png" alt="transactions"/>
                          }
                           </div>
                          </div>
    
    
                          <div className="trans_wrapper">
                             <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                          </div>
                      </div>
    
                      
                    </div> : element.type === "withdraw" ?  <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                  
                  <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                      <div className="trans_wrapper">
                        <img className="w-[50px] h-[50px]" src="images/outtrans.png" alt="transactions"/>
                      </div>

                      <div className="trans_wrapper">
                        <h6 className="font-black text-sm text-white">Amount</h6>
                      <h3 className="font-black text-white">{element.amount}</h3>
                      
                      </div>

                      <div className="trans_wrapper">
                        <span className="text-white">type</span>
                       <div className="flex items-center">
                       <h3 className="text-white font-black">withdraw </h3>
                       {
                            element.status === 'pending' ? <img className="w-[23px] h-[23px]" src="images/pending.png" alt="transactions"/> : element.status === 'rejected' ? <img className="w-[28px] h-[28px]" src="images/cancel.png" alt="transactions"/> : <img className="w-[28px] h-[28px]" src="images/done.png" alt="transactions"/>
                          }
                       </div>
                      </div>


                      <div className="trans_wrapper">
                         <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                      </div>
                  </div>

                  
                </div> : element.type === 'rejected' ?  <div className="home_component_wrapper_inside my-2 rounded-lg w-[80%] bg-[#e9eef037] backdrop-blur-[20px] px-2 shadow-lg  py-1">
                  
                  <div className="transaction_wrapper my-2 w-[100%] flex justify-between px-3 items-center flex-row ">
                      <div className="trans_wrapper">
                        <img className="w-[50px] h-[50px]" src="images/intrans.png" alt="transactions"/>
                      </div>

                      <div className="trans_wrapper">
                        <h6 className="font-black text-sm text-white">Amount</h6>
                      <h3 className="font-black text-white">{element.amount}</h3>
                      
                      </div>

                      <div className="trans_wrapper">
                        <span className="text-white">type</span>
                       <div className="flex items-center">
                       <h3 className="text-white font-black">Deposit</h3>
                        
                          {
                            element.status === 'pending' ? <img className="w-[23px] h-[23px]" src="images/pending.png" alt="transactions"/> : element.status === 'rejected' ? <img className="w-[28px] h-[28px]" src="images/cancel.png" alt="transactions"/> : <img className="w-[28px] h-[28px]" src="images/done.png" alt="transactions"/>
                          }
                       </div>
                      </div>
                    <div className="trans_wrapper">
                         <a href="/wallet" className=" text-white font-black text-lg  flex items-center">see all <img className="w-[20px] ml-2 h-[20px]" src="images/ta.png" alt="tr"/></a>
                      </div>
                  </div>
                </div> : ''

                     }
            </>

                ))
               }
        
        
        
                  </div>
        
        
        
        
                         </div>
                       </div>
                 
                    
        
        
                    <div className="cloud_bal1 flex justify-center items-center flex-col">
                      <p className="font-black">Balance</p>
                      <div className="h-[1px] w-[80%] mx-auto bg-black"></div>
                              
                      <p className="font-black text-xl">₱{currentUserId?.balance.toFixed(2)}</p>
                    </div>
                    <div className="cloud_bal2 flex justify-center items-center flex-col">
                      <p className="font-black">Referral Bonus</p>
                      <div className="h-[1px] w-[80%] mx-auto bg-black"></div>
                      <p className="font-black text-xl">₱{currentUserId?.refBal.toFixed(2)}</p>
                    </div>
        
                       
        
                  <div className="hu1 absolute bottom-2 left-2">
                    <img className="w-[300px] h-[300px] rounded-full" src='images/chickenhello.gif' alt="home"/>
                  </div>
                
               <div className="flower1"></div>
               <div className="flower"></div>
            
                  </div>
                
                </div>: ''
      }

        
        </>
    )
}


export default Wallet;
