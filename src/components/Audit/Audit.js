import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import Constants from '../../Constants/Constants'
function Audit() {
    const d = new Date().getFullYear() + '-' + '0' + ((new Date().getMonth())+1) + '-' + new Date().getDate()
    const [clicked, setClicked] = useState(false)
    const [assestDetails, setAssetDetails] = useState({
        uid:'',
        device_name: '',
        location: '',
        // createdTime: '',
        nextAudit: '',
        auditedDate: d,
        notes: '',
        checked:false,
    })
    useEffect(() => {
        // verify token
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

        async function serverCall2() {
            const uid = localStorage.auditUid
            const resp = await axios.get(`${Constants.apiBaseUrl}/asset-details`, {
                params: {
                    uid: uid
                }
            })
            if (resp) {
                setAssetDetails((prevS) => (
                    {
                        ...prevS,
                        device_name: resp.data.asset.details.device_name,
                        location: resp.data.asset.details.location,
                        uid:localStorage.auditUid,
                        // createdTime: resp.data.asset.history[0].createdTime,
                    }
                ))
            }
        }
        serverCall2()
    }, [])
    function handleChange(e) {
        setAssetDetails((prevS) => {
            return (
                {
                    ...prevS,
                    [e.target.name]: (e.target.checked) ? e.target.checked : e.target.value,
                    
                }
            )
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        async function sendDataToServer(){
            const resp = await axios.post(`${Constants.apiBaseUrl}/audit-asset`,assestDetails)
            if(resp.data){
                alert('Audit Success')
                window.location='/dashboard'
            }
        }
        sendDataToServer()
    }

    return (
        <section>
            <Navbar />
            <div className="container">
                <div className="row p-2">
                    <div className="col-lg-10 audit-box">
                        <h5 className="audit-title">Audit</h5>
                        <form onSubmit={(e)=>handleSubmit(e)}>
                            <div className="row">
                                <div className="col-4 pt-4">
                                    <span className='short-span'>Device Name</span>
                                </div>
                                <div className="col-8 pt-4">
                                    {assestDetails.device_name}
                                </div>
                                {/* END */}
                                <div className="col-4 pt-4">
                                    <span className='short-span'>Location</span>
                                </div>
                                <div className="col-8 pt-4">
                                    {
                                        clicked
                                            ? <input type="text"
                                                name="location"
                                                value={assestDetails.location}
                                                onChange={(e) => handleChange(e)} />
                                            : <><span>{assestDetails.location} &nbsp;</span></>
                                    }
                                    {/* icons */}
                                    {
                                        clicked
                                            ? <i style={{ fontSize: 24, paddingLeft: 8 }} className="fa-solid fa-xmark" onClick={() => setClicked(false)}></i>
                                            : <i style={{ fontSize: 20 }} onClick={() => setClicked(true)} className="fa-solid fa-pen-to-square"></i>
                                    }
                                    <br />
                                    <input className='mt-3' type="checkbox" name="checked" onChange={(e)=>handleChange(e)}/> <span className='short-span'>(update asset new location)</span>
                                </div>
                                {/* END */}
                                <div className="col-4 pt-4">
                                    <span className='short-span'>Next Audit Date</span>
                                </div>
                                <div className="col-8 pt-4">
                                    <input type="date" name='nextAudit' value={assestDetails.nextAudit} required onChange={(e) => handleChange(e)} />
                                </div>
                                {/* END */}
                                <div className="col-4 pt-4">
                                    <span className='short-span'>Notes</span>
                                </div>
                                <div className="col-8 pt-4">
                                    <textarea name="notes" placeholder='Verified.' value={assestDetails.notes} onChange={(e) => handleChange(e)}></textarea>
                                </div>
                                {/* END */}
                                <div className="col-4 pt-5">
                                    <p style={{ cursor: 'pointer' }} onClick={() => window.location = '/dashboard'}><i className="fa-solid fa-xmark edit-and-save cancel-btn"></i> Cancel</p>
                                </div>
                                <div className="col-8 pt-5">
                                    <button className='audit-btn'><i className="fa-solid fa-circle-check edit-and-save save-btn" style={{ marginLeft: 0 }}></i> Audit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Audit