import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" id='username' className='border p-3 rounded-lg' placeholder='username'/>
        <input type="text" id='email' className='border p-3 rounded-lg' placeholder='email'/>
        <input type="text" id='password' className='border p-3 rounded-lg' placeholder='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-2'>
        <p>Have an account?</p>
        <Link to="/sign-in" className='text-blue-700'>Sign In</Link>
      </div>
    </div>
  )
}

export default SignUp
