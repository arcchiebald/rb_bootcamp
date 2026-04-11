import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
const Dashboard = () => {
    return (
        <div className="flex items-center justify-center h-screen">

            <Input label="Password" placeholder=" Enter your password" type='password' error={1} helperText='asdads'/>
        </div>
    )
}

export default Dashboard