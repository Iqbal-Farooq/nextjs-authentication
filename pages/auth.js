import { getSession } from 'next-auth/react';
import AuthForm from '../components/auth/auth-form';
import { useRouter } from 'next/router';
import {useEffect,useState} from 'react'
function AuthPage() {
  const [isLoading,setIsLoading]=useState(true)
  const router=useRouter( )
  useEffect(()=>{
    getSession().then((session)=>{
      if(session){
        router.replace('/')
      }else{
        setIsLoading(false)
      }
    })
  },[router])
  if(isLoading){
    return<p className='center'>Loading.....</p>
  }
  return <AuthForm />;
}
// export  async function getServerSideProps(context) {
//   const session=getSession({req:context.req})
//   if(session){
//     return{
//       redirect:{
//         destination:'/',
//         permanent:false
//       }
//     }
//   }
// }

export default AuthPage;
