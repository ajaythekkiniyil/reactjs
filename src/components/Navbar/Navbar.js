import React, { useEffect,useState } from 'react'
import logo from '../../images/asset-logo.svg'
function Navbar() {
    const [username,setUsername]=useState('')
    useEffect(()=>{
        setUsername(localStorage.admin)
    },[])
    const handleLogout = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <div className='navbar'>
            <a href="/dashboard">
            <img src={logo} className='img-float' style={{height:50}} alt="" />
            </a>
            <div className="dropdown">
                <button className="btn dropdown-toggle" style={{ textTransform: 'capitalize' }} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="/create-asset">Add Assets  <i className="fa-solid fa-computer"></i></a></li>
                    <li><a className="dropdown-item" href="/add-user">Add User  <i className="fa-solid fa-user-plus"></i></a></li>
                    <li><a className="dropdown-item"  style={{ cursor: 'pointer' }} onClick={handleLogout}>Logout  <i className="fa-solid fa-arrow-right-from-bracket"></i></a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar