import React from 'react'
import { Link } from 'react-router-dom'
import {BsBookmark} from "react-icons/bs"
import {IoAppsSharp} from "react-icons/io5"
import {CgProfile} from "react-icons/cg"

function Category() {
  return (
    <div className='border-t border-borderPrimary flex justify-center items-center'>

            <Link to="/" className='mx-2 border-t md:mx-9 py-3 px-2 flex items-center'><IoAppsSharp className='mr-2'/> Posts</Link>
            <Link to="/" className='mx-2 md:mx-9 py-3 px-2 flex items-center'><BsBookmark className='mr-2'/> Saved</Link>       
            <Link to="/" className='mx-2 md:mx-9 py-3 px-2 flex items-center'><CgProfile className='mr-2'/> Tagged</Link>
        
    </div>
  )
}

export default Category