"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
const Login = () => {
  // set the timeout to 10seconds

  axios.defaults.timeout = 10000;
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);


    // Form validation
    if (!email || !password) {
      setError('Input Error: Please input all Fields');
      setTimeout(() => {
        setError('');
        setLoading(false)
      }, 1500);
     return;
    }
  
    try {
      const res = await axios.post("api/login", { email, password });
      
       
    
      if (res.status === 200) {
        Swal.fire({
          title: "Login Successfully",
          icon: 'success', 
          showConfirmButton: true,
          cofirmButtonText: 'Checks my Dashboard ?',
        })
        .then(result => {
          if (result.isConfirmed) {
            // set Cookies login to True
            Cookies.set("isLogin", true);
            // set the username
            Cookies.set("username", res.data) 

            return router.replace("dashboard")
          }
        })

      }
    
      if (res.status === 400) {
        setError('Bad Request');
        setTimeout(() => {
          setError('');
          setLoading(false)
        }, 1500);
      } else if (res.status === 404) {
        setError("User not Found... Please try again");
        setTimeout(() => {
          setError('');
          setLoading(false)
        }, 1500);
      } else if (res.status === 401) {
        setError('Invalid Email and Password. Please try again');
        setTimeout(() => {
          setError('');
          setLoading(false)
        }, 1500);
      } else {
        setError('Unexpected Error. Please try again later.');
        setTimeout(() => {
          setError('');
          setLoading(false)
        }, 1500);
      }
    
      // Clear error and loading state after a delay
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
    } catch (error) {
      setError('Error Logging in. Please try again');
      console.error(error);
    
      // Clear error and loading state after a delay
      setTimeout(() => {
        setLoading(false);
        setError('');
      }, 1500);
    }
    
  
  };

  return (
    <form onSubmit={onLogin} className="flex flex-col gap-10 border border-white p-20">
      <h1 className="text-white text-4xl text-center">LOGIN</h1>
      <input
        type="email"
        className="bg-transparent border border-white p-2 text-white rounded-md outline-none"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="bg-transparent border border-white p-2 text-white rounded-md outline-none"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <span className="bg-red-500 text-white p-2">{error}</span>}
      <button className="bg-white text-black p-2" disabled={loading}>
        {loading ? 'Loading..' : 'Login'}
      </button>
      <span className="text-white flex gap-3">
        Don't have an Account? <a href="/register" className="underline">Register Here</a>
      </span>
    </form>
  );
};

export default Login;
