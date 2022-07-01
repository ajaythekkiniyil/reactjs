import React, { useState } from 'react'
import Constants from '../../Constants/Constants.js'
import axios from 'axios'
function UserLogin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError,setLoginError] = useState(false)
    const handleLogin = () => {
        async function serverCall(){
            const resp = await axios.post(`${Constants.apiBaseUrl}/user`, {
                username: username,
                password: password
            })
            if(resp.data.userVerified){
                localStorage.setItem('userId',resp.data.userInfo.id)
                localStorage.setItem('username',resp.data.userInfo.username)
                localStorage.setItem('userToken', resp.data.token)
                window.location="/user"
            }
            else{
                setLoginError(true)
            }
        }
        serverCall()
    }

    return (
        <section className='user-login-section'>
            <div className="user-login">
                <div className="box">
                    <h5 className="login-text">User Login</h5>
                    <i className="fa-solid fa-user-lock admin-icon"></i>
                    <form action="#">
                        <input type="text" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                        <button className="btn-admin-login" onClick={handleLogin}>Login</button>
                        {loginError && <span className='text-danger'>Ooops....😥<br></br> Incorrect username or password </span>}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UserLogin