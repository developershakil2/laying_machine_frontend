'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect, useContext} from 'react';
import { Api } from '@/app/Api';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Login = ()=>{
  const {setUserId} = useContext(Api);

  const {push} = useRouter();
  const [pass, setPass] = useState('');
  const [phone , setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [logData, setLogData] = useState(null);

 
   




  
const loginHandle = () => {
if(phone === ""){
 alert("please enter your phone number or username")
}else if(pass === ""){
 alert("please enter your password")
}else{
 axios.get(`https://earnfrenzy.co/login/${phone}`)
 .then((res) => {
   const logData = res.data;
   const authorizationHeader = res.headers.authorization;
   if(authorizationHeader){
     const token = res.headers.authorization.split(' ')[1];
     setToken(token);
   }
 
   if (logData?.phone == phone && logData?.password == pass) {
     setLogData(res.data); 
     setUserId(res.data._id);
     const usersoB = {
        username:  res.data.username,
        fullName: res.data.fullName,
        userphone: res.data.phone,
        userId:res.data._id,
        userCreatedAt:res.data.createdAt,
        userBal:res.data.balance,
        userprofile:res.data.profilePicture,
        userRefBal:res.data.refBal,
        userTrans: res.data.transactions,
        userReferCode : res.data.referralCode
     }
     
     localStorage.setItem("usersOb", JSON.stringify(usersoB));
     
     push('/dashboard');
   } else {
     alert("Your password or phone didn't match");
     push('/login');
   }
 })
 .catch((err) => {
   console.log(err);

 });
}
};
useEffect(()=>{
  const data = localStorage.getItem('usersOb');
     const user = JSON.parse(data);
     if(user?.userId){
      push('/dashboard');
     }
},[])
    return(
        <div className="home_component1 home_component2">
               <Nav login="login" register="register" />
          
          <div className="home_component  relative pb-10 flex-col items-center justify-between">
       


                 <div id="registerForm" className="home_titles w-full pt-[80px]  flex flex-col justify-center items-center">
                     
                     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
                               <h2 className="w-full text-center pb-8 text-2xl font-black  text-white">Login</h2>
                    

                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Phone or username</span>
                             <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" placeholder="phone or username"   className="outline-none w-full placeholder-white px-2 py-3 rounded-xl border-[1px] bg-transparent"/>
                             </div>


                             <div className="w-full rounded-xl py-2 ">
                              <span className="pl-2 text-white">Password</span>
                             <input value={pass} onChange={(e)=> setPass(e.target.value)|| setUsername(e.target.value)} type="password" placeholder="password"   className="outline-none w-full placeholder-white px-2 py-3 rounded-xl border-[1px] bg-transparent"/>
                             </div>



                             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
                             <button onClick={loginHandle} className="bg-black rounded-xl p-4 px-10 text-white">Login </button>
                           
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