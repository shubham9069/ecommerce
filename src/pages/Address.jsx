import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../AuthProvider'
import axios from '../axios'
import Toast from '../Toast'
import Modal from './Modal'
import Loader from './Loader'


const Address = ({type,setAddressId,addressId,setShowAddress}) => {
  const {userToken}=useContext(AuthContext)
    const [isLoading,setIsLoading]=useState(true)
    const [ShowModal,setShowModal] = useState(false)
    const [Modal_for_edit,setModal_for_edit] = useState(false)
    const [editAddress,setEditAddress] = useState("")
    
    const [getAddress,setGetAddress] = useState([])

    //    --------------get address --------------0-


    const get_Address= async(e)=>{
        
      
      try{
       setIsLoading(true)
       const response= await axios({
         method: "get",
        url:`/get-all-addresses`,
         
         headers: {
           Authorization:`Bearer ${userToken}`,
           "Content-Type": "application/json",
           
         },
        })
        
        if(response.status===200){
         const data = response.data
         setGetAddress(data?.addresses)
         Toast(data.message,response.status)
        
        }
      }
      catch(err){
       const error = err.response.data
       setGetAddress([])
       Toast(error.message);
       
   
   
      }
      finally{
       setIsLoading(false)
      }
   }

useEffect(()=>{

 get_Address();
},[])


// ---------------delete address -------------------

const delete_Address= async(address_id)=>{
     
   
 try{
  setIsLoading(true)
  const response= await axios({
    method: "get",
   url:`/delete-address?address_id=${address_id}`,
    
    headers: {
      Authorization:`Bearer ${userToken}`,
      "Content-Type": "application/json",
      
    },
   })
   
   if(response.status===200){
    const data = response.data;
    get_Address()
    setAddressId("")
    Toast(data.message,response.status)
   
   }
 }
 catch(err){
  const error = err.response.data
  Toast(error.message);
  


 }
 finally{
  setIsLoading(false)
 }
}
  return (
    <>
 {/* {!isLoading &&(<Loader />)} */}
 <div style={{width: '100%', }}>
 <div className=' section container' style={{ display: 'flex', flexDirection: 'column',width:'100%' }}>

{getAddress?.map((element, index) =>{


    return  <div  className='columnAlign' style={{
        boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: 8,
        margin: '15px 0px',
        padding: 15,
    }}>
        <div className='rowAlign spaceBetween'>
            <span style={{ color: '#000' ,fontWeight:600 ,marginRight:'10px'}}>{element?.type==1?"Home":element?.type==2?"Office":"other"}</span>
          
            {type=="cart" &&(<span style={{ color: '#000', fontSize: 12,fontWeight:500,color:'grey',    float: 'right',cursor:"pointer" }} onClick={()=>{setAddressId(element);setShowAddress(false)}}>{addressId?.id==element?.id? <i class="bi bi-check-circle" style={{fontSize: 12,color:'green'}}></i>:"select" }</span>)}
            <p> </p>
        </div>
        <hr class="dropdown-divider" style={{ margin: "10px 0px 20px 0px", backgroundColor: "#aaa" }}></hr>
        <span style={{ color: '#000', fontWeight: 500 }}>{element?.name}</span><br/>
        <span style={{    color: '#9E9696',fontSize: '14px'}}> {element?.street}, {element?.landmark}, {element?.city}, {element?.state}, {element?.pin_code}
            <br></br>Contact no. : +91 {element?.mobile}
        </span>

        <hr class="dropdown-divider" style={{ margin: "10px 0px 20px 0px", backgroundColor: "#aaa" }}></hr>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', }}>
            <a  className="editLink link-a" style={{ width: 80, borderRight: '1px solid #ccc', marginRight: 30,color:'grey',fontWeight:500,fontSize:'14px' }} onClick={() =>{setModal_for_edit(true);setEditAddress(element)}}>
                <i class="bi bi-pencil" Style={'margin-right: 1px; color:grey; font-size:14px !important' } ></i> Edit
            </a>
            <div className="deleteLink" style={{ width: 100 ,color:'#f44',fontWeight:500,fontSize:'14px' ,cursor:'pointer'}} onClick={()=>delete_Address(element?.id)} >
                <i class="bi bi-trash" Style={'margin-right: 1px;color:#f44;font-size:14px !important' }></i> Remove
            </div>
        </div>

    </div>
})}
   

<br></br>
<a  className='themeButton' style={{margin: '0 0 0 auto'}} onClick={()=>{setShowModal(true)}}>Add new address</a>
<br></br>
</div>

   </div>

  {ShowModal && (<Modal show={ShowModal} setShow={setShowModal} data={""} getAddress={get_Address}   />)} 
   {Modal_for_edit && (<Modal show={Modal_for_edit} setShow={setModal_for_edit} data={editAddress} getAddress={get_Address} setAddressId={setAddressId} />)}
   </>








  )
}

export default Address