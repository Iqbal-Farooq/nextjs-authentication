import { useState,useRef } from 'react';
import classes from './auth-form.module.css';
import {signIn} from 'next-auth/react';
import { useRouter } from 'next/navigation';
async function createUser(email,password){
  const res = await fetch('/api/auth/signup',{
    method:"POST",
    body:JSON.stringify({email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  })
   const data= await res.json()
   if(!res.ok){
    throw new Error(data.message || 'Something Went Wrong')
   }
}
function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emialInputRef=useRef()
  const passwordInputRef=useRef()
  const router=useRouter()
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function submitHandler(event){
    event.preventDefault();
    const email=emialInputRef.current.value
    const password=passwordInputRef.current.value
    if(isLogin){
      const result=await signIn('credentials',{
        redirect:false,
        email:email,
        password:password
      })
      if(!result.error){
        // redirect after loging in  user 
        router.replace('/profile')
      }
      console.log('result ', result )
    }else{
      try{
       const result = await createUser(email,password)
        console.log(result)
      }catch(err){
        console.log(err)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emialInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
