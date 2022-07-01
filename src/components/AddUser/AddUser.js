import { useEffect, useState } from 'react'
import axios from 'axios'
import Constants from '../../Constants/Constants'

function AddUser() {
    useEffect(() => {
        // verify token
        const Token = localStorage.getItem('token');
        if (!Token) {
            window.location = '/admin'
        }
        async function serverCall1(){
            const response = await axios.get(`${Constants.apiBaseUrl}/verify-user`, {
                headers: {
                    'authToken': localStorage.getItem('token')
                }
            })
            if (!response.data.userVerified) {
                window.location = "/admin"
            }
        }
        serverCall1()
    })

    const [userExist, setUserExist] = useState(false)
    const [username, setName] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        async function serverCall2(){
            const response = await axios.post(`${Constants.apiBaseUrl}/create-user`, {
                username: username,
                password: password,
            })
            if (response.data.userExist) {
                setUserExist(true)
            }
            else {
                console.log(response.data)
                alert('User Created')
                window.location = '/dashboard'
            }
        }
        serverCall2()
    }

    return (
        <section className='user-login-section'>
            <div className="user-login">
                <div className="box">
                    <h5 className="login-text">Add User</h5>
                    <i className="fa-solid fa-user-gear admin-icon"></i>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setName(e.target.value)} value={username} type="text" placeholder="Username or Email" required /><br />
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required /><br />
                        <button className="btn-admin-login">Add User</button>
                        {userExist && <p className='text-danger'>Username or email already exists!</p>}
                    </form>
                </div>
            </div>
        </section>
    )
}
export default AddUser