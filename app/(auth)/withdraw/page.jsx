'use client'
import Nav from '@/app/(components)/Nav';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Withdraw = ()=>{
  const [user ,setUser] = useState('');

  const {push} = useRouter();
  const [data, setData] = useState('');
  const [dnone, setdDnone] = useState('block')

  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [bank ,setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalHandle, setModalHandle] = useState('none')
  useEffect(()=>{
      const storedData = localStorage.getItem('usersOb');
      const data = JSON.parse(storedData);
      setData(data);
  },[])
  useEffect(()=>{
    const data = localStorage.getItem('usersOb');
    setUser(JSON.parse(data));
},[]);



  const postHandle = ()=>{
    if(bankName === ""){
      setModalTitle("please enter bank name");
      setModalHandle('flex');
    }else if(bank === ""){
      setModalTitle("please enter bank number");
      setModalHandle('flex');
    }else if(amount  === ""){
      setModalTitle("please enter amount");
      setModalHandle('flex');
    }else if(holderName === ""){
      setModalTitle("please enter account holder name");
      setModalHandle('flex');
    }else{
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('user', data.userId);
      formData.append('bank', bank);
      formData.append('type', 'withdraw');
      formData.append('bankName', bankName);
      formData.append("des", holderName);
        
         axios.post('https://layingmachine.onrender.com/transaction', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res)=>{
          if(res.data){
              setModalTitle(res.data);
              setModalHandle('flex');
              setTimeout(()=>{
                push('/dashboard');
              },1000)
            }
         }).catch((err)=>{
          console.log(err);
      });
      setdDnone("none")
  setTimeout(()=>{
    setdDnone('block')
  },3000);
    }

}



const modalFunc=()=>{
  setModalHandle('none');
 
} 

    return(
      <>

<div style={{display:modalHandle}} className="absolute bg-[#7e0beb69] z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
             <div className="w-[320px] flex flex-col p-10 justify-center items-center h-[320px] rounded-xl bg-white">
                   <h2 className="text-md font-bold text-center ">{modalTitle}</h2>
                   <button onClick={modalFunc} className="bg-black p-5 mt-5 rounded-full text-white px-20 font-black">Okay</button>
                   
             </div>
    </div>  


      {
        user?.userId ?   <div className="home_component1 home_component2">
        <Nav wallet="wallet" referral="Referral" profile="profile" dashboard="Dashboard" contact="Farm" />


<div className="home_component  relative pb-10 flex-col items-center justify-between">



 <div className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
     







     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
               <h2 className="w-full text-center text-2xl font-black  text-white">Withdraw Funds</h2>
 
               <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Bank Name</span>
             <input value={bankName} onChange={(e)=> setBankName(e.target.value)} type="text" placeholder="Bank Name"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>


             <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Bank account Holder Name</span>
             <input value={holderName} onChange={(e)=> setHolderName(e.target.value)} type="text" placeholder="Bank account Holder Name"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>

             <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Bank Account Number</span>
             <input value={bank} onChange={(e)=> setBank(e.target.value)} type="number" placeholder="Bank Account Number"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>


             <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Amount</span>
             <input value={amount} onChange={(e)=> setAmount(e.target.value)} type="number" placeholder="Amount"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>


            


             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
             <button onClick={postHandle} className="bg-black rounded-xl p-4 text-white">Request For Withdraw</button>
           
             </div>

            



     </div>

 </div>


<div className="hu1 absolute bottom-2 left-2">
<img className="w-[300px] h-[300px]" src='images/huz1.gif' alt="home"/>
</div>

<div className="flower1"></div>
<div className="flower"></div>

</div>
</div>:''
      }
      
      </>
    )
}


export default Withdraw;