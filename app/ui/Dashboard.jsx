"use client"
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';




const Dashboard = () => {

  const router = useRouter();
  // states
  const [username, setUsername] = useState('')
  // trigger to get the username
  useEffect(() => {
    const isUsername = Cookies.get('username')
    if (isUsername) {
      setUsername(isUsername)
    }
  }, [])
  
  // funtion to logout the user
  const logoutUser = () => {
    // alert the user
    Swal.fire({
      title: "Are you sure you want to Logout? ",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'cancel',
      confirmButtonColor: 'light-green'

    }).then(result => {
      if (result.isConfirmed) {
        // remove the neccesary Cookies
        Cookies.remove("isLogin")
        Cookies.remove("username")

        // return to login route
        router.replace('/')
      }
    })
  } 
  
  return (
    <div>
       <h1> Hello {username}</h1>
       {/* logout BTN */}
       <button onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Dashboard