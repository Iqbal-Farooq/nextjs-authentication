import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useRouter } from 'next/navigation';
// import { getSession } from 'next-auth/react';
// import {useEffect,useState} from 'react'
function UserProfile() {
  // const [isLoading,setIsLoading]=useState(true)
  // Redirect away if NOT auth
  // useEffect(()=>{
  //   getSession().then(session=>{
  //     if(!session){
  //       // redirect the user to login
  //       window.location.href='/auth'
  //     }else{
  //       console.log('session',session)
  //       setIsLoading(false)
  //     }
  //   })
  // },[])
  // if(isLoading){
  //   return <p className='center'>Loading..</p>
  // }
  const router=useRouter()
 async function changePasswordHandler(passwordData) {
  const response= await fetch('api/user/change-password',{
    method:'PATCH',
    body:JSON.stringify(passwordData),
    headers:{
      'Content-Type':"application/json"
    }
  })
  const data=await response.json()
  if(data?.status==200){
    router.replace('/verified')
  }
  console.log('updated password => ',data );
 }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
