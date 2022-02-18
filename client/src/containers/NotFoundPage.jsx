import React from 'react'
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className='text-center' >
        <h1 className='font-bold text-2xl py-5' >Sorry, this page isn't available.</h1>
        <h2>The link you followed may be broken, or the page may have been removed.<Link to="/" className='text-btnPrimary'>Go back to Instagram.</Link></h2>
    </div>
  )
}

export default NotFoundPage