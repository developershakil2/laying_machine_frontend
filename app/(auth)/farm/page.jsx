'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Farm = () => {
  const {push} = useRouter();
  const [user, setUser] = useState('');
  const [resBuy, setResBuy] = useState('');
  const [test, setTest] = useState();

  const [modalTitle, setModalTitle] = useState(
    'Please confirm to buy chicken. Current chicken price is '
  );
  const [modalHandle, setModalHandle] = useState('none');
  const [farmPrice, setFarmPrice] = useState(1000);
  const [feedPrice, setFeedprice] = useState(400);
  const [codata, setcodata] = useState();
  const [bascicBarnPrice, setBascicBarnPrice] = useState(0);
  const [standardBarnPrice , setStandardBarnPrice] = useState(400);
  const [premiumBarnPrice, setPremiumBarnPrice] = useState(800);
  useEffect(()=>{
    const data = localStorage.getItem('usersOb');
    const codata = JSON.parse(data);
    setcodata(codata);
   },[])
    
  const [m2, setM2] = useState(false);
  const [chicken, setChicken] = useState([]);
  const [feedLength, setFeedLength] = useState([]);
  const[barn, setBarn] = useState([]);
  const [testing, setTesting] = useState(null)
  const id = user?.userId;

 console.log(user, 'testing');
  useEffect(() => {
    const data = localStorage.getItem('usersOb');
    const codata = JSON.parse(data);
    setUser(codata);
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:5000/purchasedata/${user.userId}`)
      .then((res) => {
        setChicken(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const barns = () => {
    axios
      .get(`http://localhost:5000/get-user-barn/${user.userId}`)
      .then((res) => {
        setBarn(res.data.barn);
       
        res.data.barn?.map((el)=>{
          setTesting(el.barnName)
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const feedLenght = () => {
    axios
      .get(`http://localhost:5000/getuniqueuser/${user?.userId || '65101df5901696ec6c914eb4'}`)
      .then((res) => {
        const data = res.data;
        const feed = data.feed.length;
        setFeedLength(feed);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  useEffect(() => {
 
      getData();
      feedLenght();
      barns();
  }, [user]);

 

  const purchaseHandler = (barnId) => {

    const buyFarmData = {
      userId: user.userId,
      buyAmount: farmPrice,
      isBuy: true,
      barnId:barnId
    };
    
    axios
      .post(`http://localhost:5000/buy-chicken/`, buyFarmData)
      .then((res) => {
       
        if (res.status == 400) {
          setModalTitle(res.data.error);
          setModalHandle('flex')
          setM2(true);
        }else{
          setModalTitle(res.data.message);
          setModalHandle('flex')
          setM2(true);
         
        }
        setResBuy(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const buyFeed = (purchaseId)=>{

     axios.post('http://localhost:5000/buy-feed', {
       userId:codata.userId,
       fishPurchaseId:purchaseId,
       feedPrice:feedPrice
     }).then((res)=>{
        
      if(res.status == 400){
        setModalHandle('flex')
        setModalTitle(res.data.error);
        setM2(true);
      }else{
        setModalHandle('flex')
        setModalTitle(res.data.message);
        setM2(true);
      }
      
     
     }).catch((err)=>{
      console.log(err);
     })
  }
  
  const Feed = (fishPurchaseId, userId)=>{
          axios.post('http://localhost:5000/feed',{
            fishPurchaseId:fishPurchaseId,
            userId:userId,
          }).then((res)=>{
            if(res.status == 400){
              setModalHandle('flex')
              setModalTitle(res.data.error);
              setM2(true);
            }else{
              setModalHandle('flex')
              setModalTitle(res.data.message);
              setM2(true);
            }
          }).catch((err)=>{
            console.log(err);
          })
  }

  const claim = (fishPurchaseId, userId)=>{
    axios.post('http://localhost:5000/claim-earn',{
      fishPurchaseId:fishPurchaseId,
      userId:userId,
    }).then((res)=>{
      if(res.status == 400){
        setModalHandle('flex')
        setModalTitle(res.data.error);
        setM2(true);
      }else{
        setModalHandle('flex')
        setModalTitle(res.data.message);
        setM2(true);
      }
    }).catch((err)=>{
      console.log(err);
    })
}



const bascicFunc = async () => {
  try {

    const response = await axios.post('http://localhost:5000/buy-barn', {
      userId: user.userId,
      barnName: "bascic",
      barnPrice: bascicBarnPrice,
    });

    if (response.status === 200) {
      const barnId = response.data.barn?._id;
      setModalHandle('flex');
      setModalTitle(response.data.message);
      setM2(true);
      purchaseHandler(barnId);
     

    } else {
      console.log("Something went wrong");
    }
  } catch (error) {
    console.error("Error in standardFunc:", error);
  }
};






const premiumFunc = async () => {
  try {

    const response = await axios.post('http://localhost:5000/buy-barn', {
      userId: user.userId,
      barnName: "premium",
      barnPrice: premiumBarnPrice,
    });

    if (response.status === 200) {
      const barnId = response.data.barn?._id;
      setModalHandle('flex');
      setModalTitle(response.data.message);
      setM2(true);

     
      purchaseHandler(barnId);
     

    } else {
      console.log("Something went wrong");
    }
  } catch (error) {
    console.error("Error in standardFunc:", error);
  }
};







const standardFunc = async () => {
  try {
 
    const response = await axios.post('http://localhost:5000/buy-barn', {
      userId: user.userId,
      barnName: "standard",
      barnPrice: standardBarnPrice,
    });
  if (response.status === 200) {
      if (response.data.barn && response.data.barn._id) {
        const barnId = response.data.barn._id;
        setModalHandle('flex');
        setModalTitle(response.data.message);
        setM2(true);

        // Now, you can safely call the purchaseHandler function
        purchaseHandler(barnId);
      } else {
        console.log("Barn data is missing or does not contain _id property.");
      }
    } else {
      console.log("Something went wrong");
    }
  } catch (error) {
    console.error("Error in standardFunc:", error);
  }
};


  const modalFunc = () => {
    setModalHandle('none');
    push('/dashboard');

    setTimeout(()=>{
      push('/farm')
    },2000)
  };
  return (
    <>
      <div
        style={{ display: modalHandle }}
        className="absolute bg-[#7e0beb69] z-50 top-0 left-0 w-full h-screen flex justify-center items-center"
      >
        <div
          style={{ border: '4px solid #111' }}
          className="w-[320px] backdrop-blur-[30px] flex flex-col p-10 justify-center items-center h-[480px] rounded-xl bg-[#93cae07f]"
        >  
        
          {!m2 ? (
              <div className="farm_wrap flex-col flex justify-evenly items-center">
<h2 className="text-white font-black text-center py-3">first time chicken House buy you will be charge for 1 chicken</h2>
                      <div className="farm_inner  ">
                           <button onClick={bascicFunc} className="flex justify-start rounded-xl border-[1px] border-[yellow] b-[85px] items-center">
                           <img src="images/farm1.png" alt="barn1" className="w-[80px] h-[80px] rounded-xl"/>
                            <h2 className="font-black text-md leading-[15px] text-[yellow] text-start">upto 10 chicken price is ₱{bascicBarnPrice}</h2>
                           </button>
                        </div>


                        <div className="farm_inner my-5 ">
                           <button onClick={standardFunc} className="flex py-4 justify-start rounded-xl  border-[1px] border-[#3cff00] b-[85px] items-center">
                           <img src="images/barn1.png" alt="barn1" className="w-[70px] h-[40px] rounded-xl mr-3"/>
                            <h2 className="font-black text-md leading-[15px] text-[#3cff00] text-start"> upto 50 chicken price is ₱{standardBarnPrice} </h2>
                           </button>
                        </div>
 

                        <div className="farm_inner  ">
                           <button onClick={premiumFunc} className="flex py-4 justify-start rounded-xl border-[1px] border-[#ff00b7] b-[85px] items-center">
                           <img src="images/barn2.png" alt="barn1" className="w-[70px] h-[40px] rounded-xl mr-3"/>
                            <h2 className="font-black text-md leading-[15px] text-[#ff00b7] text-start"> upto 100 chicken price is ₱{premiumBarnPrice}</h2>
                           </button>
                        </div>




                </div>
          ) : (
            <h2 className="text-xl text-white font-bold  text-center ">
              {modalTitle}
            </h2>
          )}
          {!m2 ? (
            <div className="w-full flex justify-between items-center h-[50px]">
              <button
                onClick={modalFunc}
                className="bg-black py-3 px-8 mt-5 rounded-xl text-white mr-1  font-black"
              >
                Cancel
              </button>
              {/* <button
                onClick={purchaseHandler}
                className="bg-black ml-1 py-3 px-8 mt-5 rounded-xl text-white  font-black"
              >
                Confirm
              </button> */}
            </div>
          ) : (
            <button
              onClick={modalFunc}
              className="bg-black py-3 px-8 mt-2 rounded-xl text-white  font-black"
            >
              Okay
            </button>
          )}
        </div>
      </div>

      {user?.userId ? (
        <div className="home_component1">
          <div className="home_component  relative min-h-screen flex flex-col items-center justify-end">
            <div className="farm_nav flex-wrap absolute p-4 top-0 left-0 flex justify-center items-center">
              <button className="backdrop-blur-[70px] my-2 bg-[#040b0f9a] text-white font-black text-lg px-4 py-2 rounded-xl flex items-center">
                total farm {barn?.length}{' '}
                <img src="images/farm1.png" alt="feed" className="w-[35px] h-[35px] ml-2" />
              </button>
              <button className="backdrop-blur-[70px] my-1 bg-[#040b0f9a] text-white mx-2 font-black text-lg px-4 py-2 rounded-xl flex items-center">
                {' '}
                feeds bag {feedLength} <img src="images/food.png" alt="feed" className="w-[35px] h-[35px] ml-2" />
              </button>
              <button
                onClick={() => setModalHandle('flex')}
                className="bg-black my-1 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Buy Farm
              </button>
              <a
                href="/dashboard"
                className="bg-black my-1 ml-2 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Dashboard
              </a>
            </div>

            <div className=" bg-white   p-4 rounded-xl w-[350px]">
              <h3>
                you will have to feed your chicken daily and your chicken will lay egg 1% = 1 egg you will get daily 1%
                for 100 days
              </h3>
            </div>
            <div className="h-[400px] overflow-y-hidden  w-[390px] flex items-start justify-start ">
              <div className=" overflow-x-hidden flex-col farm_wrapper overflow-y-scroll h-[400px] w-[390px] flex items-start justify-start">
                {Array.isArray(chicken) && chicken.length > 0 ? (
                  chicken.map((el, inx) => (
                    <div key={inx} className="my-[65px] relative">
                     
                      <div className="chicken_farm my-5 flex items-center  justify-center  relative ">
                        <div className="absolute bg-[#880b17]  -top-[64px] z-10 p-2 rounded-xl w-[350px]">
                           {
                            el.barnName === "bascic"?  <h2 className="text-md text-white font-black flex items-center">
                            Basic Farm total Eggs = {' '}
                            <img src="images/egg.png" alt="egg" className="w-[35px] h-[35px]" />{' '}
                            <span className="text-2xl font-black"> {el.earnings > 0 ? el.earnings.toFixed(0) : 0}</span>
                          </h2> : el.barnName === "standard" ?   <h2 className="text-md text-white font-black flex items-center">
                            Standard Farm total Eggs {' '}
                            <img src="images/egg.png" alt="egg" className="w-[35px] h-[35px]" />{' '}
                            <span className="text-2xl font-black"> {el.earnings > 0 ? el.earnings.toFixed(0) : 0}</span>
                          </h2>:  <h2 className="text-md text-white font-black flex items-center">
                            Premium Farm total Eggs{' '}
                            <img src="images/egg.png" alt="egg" className="w-[35px] h-[35px]" />{' '}
                            <span className="text-2xl font-black"> {el.earnings > 0 ? el.earnings.toFixed(0) : 0}</span>
                          </h2>
                           }
                        </div>

                        <div className="mt-190px] w-[390px] h-[220px] flex flex-col justify-center items-center relative">
                        
                         {

                          el.barnName == 'bascic' ? <div className="farm_group">
                          {
                        el.earningPaused === true ? <h2 className="text-sx ml-5 text-center py-10 text-white font-black bg-red-500 mt-20 px-8">._ hey Feed  your chicken </h2>:  <img src="images/giphy.gif" alt="chicken" className="w-[200px] chicken_ absolute top-[40%] left-[15%] h-[200px] rounded-full" />
                       }
                      <img src="images/farm.png" alt="farm" className="farm_home ml-3 absolute -top-10 -left-10" />
                     
                            </div> 
                            
                            : 
                            
                            el.barnName === 'standard' ?
                            <div className="farm_group">
                        {
                        el.earningPaused === true ? <h2 className="text-sx ml-5 text-center py-10 text-white font-black bg-red-500 mt-20 px-8">._ hey Feed  your chicken </h2>:  <img src="images/giphy.gif" alt="chicken" className="w-[200px] chicken_ absolute top-[40%] left-[15%] h-[200px] rounded-full" />
                       }
                      <img src="images/barn1.png" alt="farm" className="farm_home ml-3 absolute -top-10 -left-10" />
                     
                           </div> 
                           
                           : el.barnName === "premium" ?  <div className="farm_group">
                     
                           {
                            el.earningPaused === true ? <h2 className="text-sx ml-5 text-center py-10 text-white font-black bg-red-500 mt-20 px-8">._ hey Feed  your chicken </h2>:  <img src="images/giphy.gif" alt="chicken" className="w-[200px] chicken_ absolute top-[40%] left-[15%] h-[200px] rounded-full" />
                           }
                          <img src="images/barn2.png" alt="farm" className="farm_home ml-3 absolute -top-10 -left-10" />
                         
                          </div>: ''

                     


                         }

                          {el.earningPaused === true ? (
                            <div className="w-[300px] h-12 flex justify-between items-center">
                              <button onClick={()=> Feed(el._id, el.userId)} className="bg-black absolute z-10  -bottom-[16px] rounded-xl w-[160px] text-white font-black px-6 py-2">Feed Chicken</button>
                             
                             {
                              chicken ?  <button onClick={()=> buyFeed(el._id)} className="bg-red-600 absolute z-10 ml-[180px] -bottom-[16px] rounded-xl w-[160px] text-white font-black px-6 py-2">Buy Feed Bag</button>:''
                             }
                              
                              <div className="w-10"></div>
                          
                            </div>
                          ) :  (<div className=" absolute -bottom-[16px] w-[300px]">
                                <h2 className="font-black text-xl text-center text-white px-8 py-2 rounded-xl">your chicken is eating</h2>
                               </div>
                            )
                          
                          }

                          <div className="w-full absolute flex justify-between items-center left-0 -bottom-[70px]">
                          <button  onClick={()=>claim(el._id, el.userId)} className="bg-black   z-10 left-[85px] -bottom-[66px] rounded-xl  text-white font-black px-6 py-2">Sell your Eggs</button>
                           <button onClick={()=>purchaseHandler(el.barns)} className="bg-black  z-10 left-[85px] -bottom-[66px] rounded-xl  text-white font-black px-6 py-2">Buy Chicken</button>
                       </div>
                         
                        </div>
                      </div>
                     
                    </div>

                  ))
                ) : (
                  <div className="w-full flex justify-center items-center">
                      <button
                onClick={() => setModalHandle('flex')}
                className="bg-black my-1 mt-11 text-white cursor-pointer font-black text-xl px-4 py-2 rounded-xl"
              >
                Buy Chicken house
              </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Farm;
