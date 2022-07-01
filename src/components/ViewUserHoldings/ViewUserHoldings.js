import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Constants from '../../Constants/Constants'

function ViewUserHoldings() {
    const [userAssetHoldings, setUserAssetsHoldings] = useState([])
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (!Token) {
            window.location = '/admin'
        }
        async function serverCall() {
            const resp = await axios.get(`${Constants.apiBaseUrl}/verify-admin`, {
                headers: {
                    'authToken': localStorage.getItem('token')
                }
            })
            if (!resp.data.adminVerified) {
                window.location = "/admin"
            }
        }
        serverCall()

        async function serverCall_2() {
            const user_id = localStorage.view_user_info_id
            const resp = await axios.get(`${Constants.apiBaseUrl}/assets-holdings`, {
                params: {
                    username: user_id,
                }
            })
            if (resp) {
                setUserAssetsHoldings(resp.data)
            }
        }
        serverCall_2()
    }, [])

    const assetDetailsPage = (uid)=>{
        localStorage.setItem('uid', uid)
        window.location = '/asset-details'
    }
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row m-1">
                    {
                        // ternory operation
                        userAssetHoldings.length !== 0
                            ?
                            userAssetHoldings.map((eachItems, index) => {
                                // image url 
                                const assetImageUrl = Constants.serverDomain + '/server/assetImages/' + eachItems.uid + '.jpg' 
                                return (
                                    <div className="col-12 view-user-holdings">
                                        <div className="row">
                                            <div className="col-md-6 col-lg-2">
                                                <img className='img-fluid' width={100} height={100} src={assetImageUrl} alt="" />
                                            </div>
                                            <div className="col-md-6 col-lg-10">
                                                <h6 className='pt-3'>Device Name: {eachItems.details.device_name}</h6>
                                                <span className='asset-id' onClick={()=>assetDetailsPage(eachItems.uid)}>
                                                    <span className='short-span'>Asset id:</span> {eachItems.uid}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div className="col-12 view-user-holdings">
                                <div className="row">
                                    <div className="col-12 col-lg-10">
                                        <h6 className='pt-3'>No assets holdings...</h6>
                                    </div>
                                </div>
                            </div>

                    }

                </div>
            </div>
        </>
    )
}

export default ViewUserHoldings