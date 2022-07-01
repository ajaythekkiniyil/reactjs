import { useEffect } from "react"
import TotalAssets from "../TotalAssets/TotalAssets"
import Users from "../Users/Users"
import NavBar from '../Navbar/Navbar'
import axios from 'axios'
import Constants from '../../Constants/Constants'
import DashboardView from "../DashboardView/DashboardView"

function Dashboard() {
    
    useEffect(()=>{
        // verify token
        const Token=localStorage.getItem('token');
        if(!Token){
            window.location='/admin'
        }
        async function serverCall(){
            const resp = await axios.get(`${Constants.apiBaseUrl}/verify-admin`,{
                headers:{
                    'authToken': localStorage.getItem('token')
                }
            })
            if(!resp.data.adminVerified){
                window.location="/admin"
            }
        }
        serverCall()
    },[])
    return (
        <div className="dashboard">
            <NavBar/>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="assets-tab" data-bs-toggle="tab" data-bs-target="#assets" type="button" role="tab" aria-controls="assets" aria-selected="true">Total Assets</button>
                </li>
                {/* <li className="nav-item" role="presentation">
                    <button className="nav-link" id="digital-tab" data-bs-toggle="tab" data-bs-target="#digital" type="button" role="tab" aria-controls="digital" aria-selected="false">Digital Assets</button>
                </li> */}
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="false">Dashboard view</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user" type="button" role="tab" aria-controls="user" aria-selected="false">Users</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="export-tab" data-bs-toggle="tab" data-bs-target="#export" type="button" role="tab" aria-controls="export" aria-selected="false">Exports</button>
                </li>
                
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="assets" role="tabpanel" aria-labelledby="assets-tab">
                    <TotalAssets />
                </div>
                <div className="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                    <DashboardView/>
                </div>
                <div className="tab-pane fade" id="user" role="tabpanel" aria-labelledby="user-tab">
                    <Users/>
                </div>
                <div className="tab-pane fade" id="export" role="tabpanel" aria-labelledby="export-tab">
                   <div className="container-fluid">
                   Updated soon...
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard