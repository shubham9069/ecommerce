import {Outlet} from 'react-router-dom'
import {react,useEffect,useContext,useState} from 'react'
import Toast from '../Toast'

import {AuthContext} from '../AuthProvider'
import axios from '../axios'
import Loader from './Loader'


const PresistLogin =()=>{
    const {userToken,setUserToken,setUserData,userData,setCart,dispatch}= useContext(AuthContext);
    const [isloading,setIsLoading] = useState(true);
    
    const get_Cart = async(Headertoken)=>{
  
        try{
         
         const response= await axios({
           method: "get",
          url:'/cart-list',
           headers: {
             'Authorization': `Bearer ${Headertoken}`
             
           },
          })
          
          if(response.status===200){
           const data = response.data;
           
          dispatch({type:'cartItem',value:data?.cart_items})
          }
        }
        catch(err){
         const error = err.response.data
        //  Toast(error.message);
         
    
    
        }
        finally{
            setIsLoading(false)
        }
       
     }
    


  

    useEffect(() => {

        const tokenGet = () =>{
           
            
            const strtoken = window.localStorage.getItem('userToken');
            const strdata = window.localStorage.getItem('userData');
           
            const token = JSON.parse(strtoken);
            const data = JSON.parse(strdata);
            setUserToken(token)
            setUserData(data)
             token &&(get_Cart(token))
        }

 if(userToken && userData){
    get_Cart(userToken)
    setIsLoading(false);
    
    
 }
 else{
    tokenGet();
    setIsLoading(false)
 }

    }, [])

    return (
        <>
        {isloading  
            ? <Loader />
            :<Outlet/>
         }
    </>
    )

    
}

export default PresistLogin
