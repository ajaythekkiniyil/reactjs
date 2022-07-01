import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Constant from '../../Constants/Constants'
function Users() {
    const [allUsers, setAllUsers] = useState([{
    }])
    useEffect(() => {
        async function serverCall() {
            const users = await axios.get(`${Constant.apiBaseUrl}/get-all-users`)
            if(users){
                setAllUsers(users.data)
            }
        }
        serverCall();
    }, [])
    function viewUserProfile(asset_holder){
        localStorage.setItem('view_user_info_id',asset_holder)
        window.location = '/view-user-holdings'
    }
    return (
        <section className='users'>
            <div className="row">
                {
                    allUsers.map((eachUser,index) => {
                        const dp = `${Constant.serverDomain + '/server/userImages/' + eachUser._id + '.jpg'}`;
                        return (
                            <div className="col-md-3" key={index}>
                                <div className="user-card">
                                    <div className="row">
                                        <div className="col-4">
                                            <img className='img-fluid user-image' src={dp} alt="" />
                                        </div>
                                        <div className="col-8 pt-3">
                                            <h6>{eachUser.username}</h6>
                                            <p className='user-subtext'>{eachUser.designation}</p>
                                        </div>
                                        <div className="col-12 p-3">
                                            <p className='user-subtext'><i className="fa-solid fa-phone"></i> &nbsp;{eachUser.phone}</p>
                                            <p className='user-subtext'><i className="fa-solid fa-envelope"></i> &nbsp;{eachUser.email}</p>
                                            <p className='user-subtext'><i className="fa-solid fa-location-dot"></i> &nbsp;{eachUser.location}</p>
                                        </div>
                                        <hr />
                                        <div className="col-6"><p  style={{cursor:'pointer'}} onClick={()=>viewUserProfile(eachUser.username)}>Holdings</p></div>
                                        <div className="col-6"><a href={`tel:${eachUser.phone}`}>Contact</a></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
        </section>
    )
}

export default Users