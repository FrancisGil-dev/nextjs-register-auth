"use client"
import { useRouter } from 'next/navigation';
import React, {useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const Register = () => {
    // data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, isLoading] = useState(false);
    const router = useRouter();

    const onRegister = async (e) => {
        e.preventDefault();
        isLoading(true);

        // form validation 
        if (!email || !password || !username) {
            isLoading(true);
            setError("Input Error: Please input all Fields");
            // timeout to remove

            setTimeout(() => {
                setError('');
                isLoading(false)
            }, 1500);
        }

        // post data to the route using try catch async
     
         try {
            await axios.post('api/register', {username, email, password})
            .then(res => {
                if (res.status === 400) {
                    setError("Email already Existed");
                    setTimeout(() => {
                        isLoading(false);
                        setError('');
                    },1500);
    
                    return
                }
                if (res.status === 200) {
                   
                    // set the cookies to username to print the username in dashboard route
                   
                    //  alert the user
                    Swal.fire({
                        title: 'Successfully Registered',
                        showConfirmButton: true,
                        confirmButtonText: 'Go to Dashboard',
                        showCancelButton: true,
                        cancelButtonText: 'Go to Login? '                        
                    })
                    .then(result =>{
                        if(result.isConfirmed){
                            Cookies.set("username", username);
                            Cookies.set("loggedIn", true);
                            return router.replace("/dashboard")
                        }
                        else{
                            return router.replace("/")
                        }
                    } )
                }
                if (res.status === 500) {
                   setError("Server Error: Please try again...")
                   setTimeout(() => {
                        isLoading(false)
                        setError("")
                   }, 1500);
                   return
                   
                }
    
            }) 
           
         } catch (error) {
            console.error(error);
         }
            
           
       
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
        <button className='bg-white text-black p-2' disabled={loading}>{loading ? "Loading..." : "Register"}</button>
        {/*Already have an Account*/}
        <span className='text-white flex gap-3'>Already have an Account? 
            <a href="/" className='underline'>Login Here</a>
        </span>
    </form>
  )
}

export default Register