"use client"
import React, { useState } from 'react'

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    // handle the submission
    const onLogin = (e) => {
        e.preventDefault()
    }
  return (
    <form onSubmit={onLogin} className='flex flex-col gap-10 border border-white p-20' >
        <h1 className='text-white text-4xl text-center'>LOGIN</h1>
        <input type="email"  className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Username'/>
        <input type="password" className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Password'/>
        <button className='bg-white text-black p-2'>Login</button>
        {/*doesnt have an Account*/}
        <span className='text-white flex gap-3'>Doensn't have an Account? 
        <a href="/register" className='underline'>Register Here</a>
        </span>

    </form>
  )
}

export default Login