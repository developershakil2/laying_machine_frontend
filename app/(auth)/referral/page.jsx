

'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect} from 'react';


const Refer= ()=>{

  
    const [user, setUser] = useState('');
      
    useEffect(()=>{
      const data = localStorage.getItem('usersOb');
      setUser(JSON.parse(data));
    },[]);
  

    return(
        <>
       {
        user?.userId ?     <div className="home_component1">
        <Nav dashboard="dashboard" wallet="wallet" profile="profile" contact="Farm" />
  
       
       <div className="home_component  relative min-h-screen flex-col items-center justify-between">
       <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
                  
                  <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                            <h2 className="w-full text-center text-2xl font-black  text-white">Refer To Your Friends</h2>
                 
                            <div className="w-full flex justify-center items-center rounded-xl py-2 ">
                         <img className="w-[100%] h-[180px] rounded-xl" src="images/refer.png" alt="refer"/>
                          </div>
                          <div className="w-full rounded-xl py-2 ">
                            <input  type="text" value={`https://earnfrenzy.co/?id=${user.userId}`}  className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
                          </div>
                          <div className="w-full rounded-xl py-2 ">
                           
                           <h4 className="text-white font-black text-center">Refer to your friends & Earn 5% of thier investment Refer Now</h4>
                         
                          </div>
                         

                          <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                          <button onClick={ ()=> navigator.clipboard.writeText(`https://earnfrenzy.co/register/?id=${user.userId}`) }  className="bg-black rounded-xl p-4 text-white">copy your refer code</button>
                        
                          </div>

                        


                  </div>
       
              </div>


              <div className="hu1 absolute bottom-2 left-2">
         <img className="w-[300px] h-[300px] rounded-full" src='images/chickenhello.gif' alt="home"/>
       </div>
     
    <div className="flower1"></div>
    <div className="flower"></div>
 
       </div>
     
     </div>
      : ''
       }
        </>
    )
}


export default Refer;
