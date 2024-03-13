"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("")
    const [loading, isLoading] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // handle the submission
    const onLogin = async(e) => {
        isLoading(true)
        e.preventDefault();

         // form validation 
         if (!email || !password) {
        
          setError("Input Error: Please input all Fields");
          // timeout to remove

          setTimeout(() => {
              setError('');
              isLoading(false)
          }, 1500);

          try {
           const res =  await axios.post("api/login", {email,password});

            if (res.status === 200) {
              alert("Login Success");
             
              router.replace('/dashboard');

              setTimeout(() => {
                isLoading(false)
              }, 1500);
            }
            if (res.status === 404) {
              
              setError("Fix your Router");

              setTimeout(() => {
                isLoading(false)
                setError('')
              }, 1500);
            }
          } catch (error) {
            setError("Error Logging in Please try again...");
      
            console.error(error);

            setTimeout(() => {
              isLoading(false)
              setError('')
            }, 1500);
          }
      }
    }
  return (
    <form onSubmit={onLogin} className='flex flex-col gap-10 border border-white p-20' >
        <h1 className='text-white text-4xl text-center'>LOGIN</h1>
        <input type="email"  className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        {error && (
            <span className='bg-red-500 text-white p-2'>{error}</span>
        )}
        <button className='bg-white text-black p-2' disabled={loading}>{loading ? "Loading.." : "Login"}</button>
        {/*doesnt have an Account*/}
        <span className='text-white flex gap-3'>Doensn't have an Account? 
        <a href="/register" className='underline'>Register Here</a>
        </span>

    </form>
  )
}

export default Login