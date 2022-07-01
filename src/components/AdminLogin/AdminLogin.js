import {useState} from 'react'
import axios from 'axios'
import Constants from '../../Constants/Constants'

function AdiminLogin() {
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
        async function serverCall(){
            const response = await axios.post(`${Constants.apiBaseUrl}/admin`,{
                username:username,
                password:password
            })
            if(response.data.verified){
                localStorage.setItem('admin', response.data.username)
                localStorage.setItem('token', response.data.token)
                window.location="/dashboard"
            }
            else{
                setError(true)
            }
        }
        serverCall()        
    }
    return (
        <section style={{background:'white'}}>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <img src={require('../../images/admin-login.jpg')} alt="" className="img-fluid" />
                </div>
                <div className="col-md-4">
                    <div className="admin-login">
                        <div className="box">
                            <h5 className="login-text">Admin Login</h5>
                            <i className="fa-solid fa-user-shield admin-icon"></i>
                            <form onSubmit={handleSubmit}>
                                <input
                                     type="text"
                                     placeholder="Username or Email"
                                     value={username}
                                     onChange={(e)=>setUserName(e.target.value)}
                                     required
                                />     
                                <br />
                                <input
                                     type="password" 
                                     placeholder="Password" 
                                     value={password}
                                     onChange={(e)=>setPassword(e.target.value)}
                                     required
                                />
                                <br />
                                <button className="btn-admin-login">Login</button>
                                { error && <p className='text-center text-danger'>Username or Password incorrect!</p> }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}
export default AdiminLogin