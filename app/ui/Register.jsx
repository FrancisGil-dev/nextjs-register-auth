"use client"
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import axios from 'axios';

const Register = () => {
    // data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const onRegister = async (e) => {
        e.preventDefault();

        // input validation
        if (!email || !password || !username) {
            setError("Input Error: Please input all Fields");
            // timeout to remove

            setTimeout(() => {
                setError('')
            }, 1500);
        }

        // post data to the route using then
     
         await axios.post("api/register", {email, password})
         .then(res => {
            if (res.status == 400) {
                setError(res.data)

                // setTimeout to remove the error
                setTimeout(() => {
                    setError("")
                }, 1500);
            }
            if (res.status == 200) {
                alert(res.data)

                // push to the login
                router.push('/dashboard');
            }
            if (res.status === 500) {
                setError(res.data)
                setTimeout(() => {
                    setError('')
                }, 1500);
            }
         })
         .catch(err => console.error(err))

            
           
       
    }
  return (
    <form className='flex flex-col gap-10 border border-white p-20' onSubmit={onRegister}>
        <h1 className='text-white text-4xl text-center'>Register</h1>
        <input type="text"  className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Username' value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="email"  className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Email'value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="password" className='bg-transparent border border-white p-2 text-white rounded-md outline-none'
        placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
        {/* render the error if the fields doesn't fill in */}
        {error && (
            <span className='bg-red-500 text-white p-2'>{error}</span>
        )}
        <button className='bg-white text-black p-2'>Register</button>
        {/*Already have an Account*/}
        <span className='text-white flex gap-3'>Already have an Account? 
            <a href="/" className='underline'>Login Here</a>
        </span>
    </form>
  )
}

export default Register