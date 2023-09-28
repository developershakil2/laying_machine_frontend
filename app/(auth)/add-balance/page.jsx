'use client'
import Nav from '@/app/(components)/Nav';
import React,{useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AddBalance = ()=>{
    const [user, setUser] = useState('');
    

const [bankDet, setBankDet] = useState('');
console.log(bankDet, 'consol')
    useEffect(()=>{
      const data = localStorage.getItem('usersOb');
      setUser(JSON.parse(data));

      const Id = `65151b2e29aeef136d9243ca`;
      axios.get(`https://layingmachine.onrender.com/bankget/${Id}`).then((res)=>{
        setBankDet(res.data);
      }).catch((err)=>{
        console.log(err);
      })
    },[]);




    const {push} = useRouter();
    const [userData, setUserData] = useState();
    const [amount, setAmount] = useState('');
    const [selectImage, setSelectImage] = useState(null);
  const [dnone, setdDnone] = useState('block')
    const [previewUrl, setPreviewUrl] = useState('');
      const [bankDetails, setBankDetails] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalHandle, setModalHandle] = useState('none')
    useEffect(() => {
      const data = localStorage.getItem('usersOb');
      setUserData(JSON.parse(data));
       const Id = `64d52b0cc4c81a157644110a`;
      axios.get(`https://layingmachine.onrender.com/bankget/${Id}`).then((res)=>{
        setBankDetails(res.data);
      }).catch((err)=>{
        console.log(err);
      })
  
    }, []);
  
    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };
   
    const postHandle = () => {
      try {
        if (!selectImage || !amount) {
          alert('Please select an image and enter the amount.');
          return;
        }
        if(amount ===  ""){
          
          setModalTitle('please enter request amount');
          setModalHandle('flex');
        }else{
          const formData = new FormData();
          formData.append('user', userData.userId);
          formData.append('amount', amount);
          formData.append('type', 'deposit');
          const blob = dataURItoBlob(previewUrl);
                   const uniqueFilename = `proofImg_${Date.now()}.jpg`;
    
                   formData.append('proofImg', blob, uniqueFilename);
    
          axios
            .post('https://layingmachine.onrender.com/transaction', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              
              if(res.data){
                setModalTitle(res.data);
                setModalHandle('flex');
                setTimeout(()=>{
                  push('/dashboard');
                },1000)
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      
      } catch (error) {
        console.error('Error:', error);
      }
  
      setdDnone("none")
      setTimeout(()=>{
        setdDnone('block')
      },3000);
  
    };
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectImage(file);
  
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    };
  
  
    
    const modalFunc=()=>{
      setModalHandle('none');
     
    } 












    return(
       <>
        <div style={{display:modalHandle}} className="absolute bg-[#000000bb] z-50 top-0 left-0 w-full h-screen flex justify-center items-center">
             <div className="w-[320px] flex flex-col p-10 justify-center items-center h-[320px] rounded-xl bg-white">
                   <h2 className="text-md font-bold text-center ">{modalTitle}</h2>
                   <button onClick={modalFunc} className="bg-black p-5 mt-5 rounded-full text-white px-20 font-black">Okay</button>
                   
             </div>
    </div>





       {
        user?.userId ?    <div className="home_component1 home_component2">
        <Nav wallet="wallet" referral="Referral" profile="profile" dashboard="Dashboard" contact="Farm"/>


<div id="addBal" className="home_component  relative pb-10 flex-col items-center justify-between">



 <div  className="home_titles w-full pt-[50px]  flex flex-col justify-center items-center">
     

 <div className="w-[350px] mb-3 backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
               <h2 className="w-full text-start text-2xl font-black  text-white">Payment Details</h2>
    
<div className="border-[1px] my-2 p-2 bg-black  rounded-xl">
    <img className="w-[60px] h-[60px]" src="images/bank.png" alt="bank icons"/>
    <h4 className="font-black text-white">Bank Details</h4>
    <div className="w-full h-[1px] bg-white "></div>
    <div className='border-[1px] rounded-lg p-3'>
        <p className="font-black text-white  p-1">Bank Name : {bankDet.bankName}</p>
        <div className="w-full h-[1px] bg-white "></div>
        <p className="font-black text-white  p-1">Account Holder : {bankDet.bankAccountHolderName}</p>
        <div className="w-full h-[1px] bg-white "></div>
        <p className="font-black text-white  p-1">Account : {bankDet.bankNumber}</p>
    </div>

  
</div>



             

     </div>







     <div className="w-[350px] backdrop-blur-[20px] shadow-lg z-40 px-6 pt-6 pb-3 rounded-xl bg-transparent border-[1px]">
               <h2 className="w-full text-center text-2xl font-black  text-white">Add Balance</h2>
    
               <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Select Your Proof of transaction</span>
             <input onChange={handleImageChange} type="file" placeholder="Ex: grayson"   className="outline-none w-full placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>

             

            



             <div className="w-full rounded-xl py-2 ">
              <span className="pl-2 text-white">Amount</span>
             <input onChange={(e)=> setAmount(e.target.value)} type="number" placeholder="Amount"   className="outline-none w-full text-white font-black placeholder-white px-2 py-2 rounded-xl border-[1px] bg-transparent"/>
             </div>


            


             <div className="w-full flex justify-center items-center  rounded-xl py-2 ">
             <button onClick={postHandle} className="bg-black rounded-xl p-4 text-white">Request To Add balance</button>
           
             </div>

            



     </div>

 </div>


<div className="hu1 absolute bottom-2 left-2">
<img className="w-[300px] h-[300px]" src='images/huz1.gif' alt="home"/>
</div>

<div className="flower1"></div>
<div className="flower"></div>

</div>
</div>: ''
       }
       </>
    )
}


export default AddBalance;
