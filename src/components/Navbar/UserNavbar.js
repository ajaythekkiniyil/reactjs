import { useEffect, useState } from 'react'
import logo from '../../images/asset-logo.svg'
import axios from 'axios'
import constants from '../../Constants/Constants.js'
function UserNavbar() {
    const [userInfo, setUserInfo] = useState({})
    const [id, setUserId] = useState()
    const [dpPreview, setDpPreview] = useState()
    const [updatedDp, storeDp] = useState()
    useEffect(()=>{
        async function serverCall(){
            const resp = await axios.get(`${constants.apiBaseUrl}/get-user-profile`,{
                params:{
                    username:localStorage.username
                }
            })
            if(resp){
                setUserId(resp.data._id)
                setUserInfo(resp.data)
            }
        }
        serverCall()
    },[])
    function handleChange(e) {
        console.log(userInfo);
        setUserInfo((prevS) => {
            return (
                {
                    ...prevS,
                    [e.target.name]: [e.target.value]
                }
            )
        })
    }
    async function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData()
        console.log(userInfo);
        formData.append('updatedUser',JSON.stringify(userInfo))
        formData.append('image',updatedDp)
        formData.append('uid',id)
        const response = await axios.post(`${constants.apiBaseUrl}/update-user-profile`,formData)
        if(response){
            window.location.reload()
        }
    }
    return (
        <section className='user-navbar'>
            <div className="logo">
                <img src={logo} style={{ height: 50 }} alt="" />
            </div>
            <div className="dropdown avatar">
                <button style={{textTransform:'capitalize'}} className="btn btn-avatar dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {userInfo.username}
                </button>
                <div className="dropdown-menu dropdown-user-profile" aria-labelledby="dropdownMenuButton1">
                    <div className="row">
                        <div className="col-4">
                            <div className="dp col-12">
                                <img src={`${constants.serverDomain + '/server/userImages/' + id + '.jpg' }`} className="img-fluid" alt="dp" />
                            </div>
                        </div>
                        <div className="col-8 p-0">
                            <h6 className='profile-name pt-4'>{userInfo.username}</h6>
                            <p>{userInfo.designation}</p>
                        </div>
                        <div className="user-profile-details">
                            <p><i className="fa-solid fa-location-dot"></i> {userInfo.location}</p>
                            <p><i className="fa-solid fa-phone"></i> {userInfo.phone}</p>
                            <p><i className="fa-solid fa-envelope-circle-check"></i> <span style={{ textTransform: 'lowercase' }}>{userInfo.email}</span></p>
                        </div>
                        <hr />
                        <div className="col-6 text-center">
                            <p style={{ cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit <i className="fa-solid fa-pen-to-square"></i></p>
                        </div>
                        <div className="col-6 text-center">
                            <button className="logout-btn-user"
                                onClick={() => {
                                    localStorage.clear()
                                    window.location.reload()
                                }}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div class="modal-body">
                                <input type="text" placeholder='Designation' value={userInfo.designation} name='designation' onChange={(e) => handleChange(e)} />
                                <input type="text" placeholder='Location' value={userInfo.location} name='location' onChange={(e) => handleChange(e)} />
                                <input type="tel" placeholder='Phone' value={userInfo.phone} name='phone' onChange={(e) => handleChange(e)} />
                                <input type="email" placeholder='Email' value={userInfo.email} name='email' onChange={(e) => handleChange(e)} />
                                <input required type="file"  onChange={(e) => {
                                    storeDp(e.target.files[0])
                                    setDpPreview(URL.createObjectURL(e.target.files[0]))
                                    } } />
                                {dpPreview && <img src={dpPreview} width="100"/>}
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn-model">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default UserNavbar