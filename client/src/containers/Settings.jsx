import React from 'react'
import SettingNav from '../components/Settings/SettingNav'
import {Route , Routes} from "react-router-dom"
import EditProfile from '../components/Settings/EditProfile'
import ChangePassword from '../components/Settings/ChangePassword'

function Settings() {
  return (
    <div className='flex w-full border border-borderPrimary'>
        <SettingNav/>
        <Routes>
            <Route path='edit' element={<EditProfile/>} />
            <Route path='password/change' element={<ChangePassword/>} />
        </Routes>
        
    </div>
  )
}

export default Settings