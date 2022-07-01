import { useEffect, useState } from "react"
import axios from 'axios'
import Constants from '../../Constants/Constants'
import Chart from 'chart.js'
function DashboardView() {
    const [totalData, setToatlData] = useState({
        totalAssets: 0,
        totalUsers: 0,
        totalCamera: 0,
        totalWires: 0,
    })
    useEffect(() => {
        async function serverCall() {
            const resp = await axios.get(`${Constants.apiBaseUrl}/get-total-data`)
            if (resp) {
                setToatlData((prevData) => (
                    {
                        ...prevData,
                        totalAssets: resp.data.totalAssets,
                        totalUsers: resp.data.totalUsers,
                        totalCamera: resp.data.totalCamera,
                        totalWires: resp.data.totalWires,
                    }
                ))
            }
        }
        serverCall()

        const ctx = document.getElementById('myChart1').getContext('2d');
        const myChart1 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Total Assets',
                    'Total Users',
                    'Total Cameras',
                    'Total Wires / Cables',
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [totalData.totalAssets, totalData.totalUsers, totalData.totalCamera, totalData.totalWires],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                }]
            }
        });

        const ctx2 = document.getElementById('myChart2').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: [
                    'Total Assets',
                    'Total Users',
                    'Total Cameras',
                    'Total Wires / Cables',
                ],
                datasets: [{
                    label: 'My First Dataset',
                    data: [totalData.totalAssets, totalData.totalUsers, totalData.totalCamera, totalData.totalWires],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                }]
            }
        });
    }, [totalData.totalAssets])
    return (
        <section className="dashboard-View">
            <div className="row">
                <div className="col-md-3 pt-3">
                    <div className="inner-box">
                        <div className="row">
                            <div className="col-8 texts">
                                <p className="text-muted">Total Assets</p>
                                <h1>{totalData.totalAssets}</h1>
                                <i className="fa-solid fa-circle-arrow-up"></i><small className="text-muted"> Since Last day</small>
                            </div>
                            <div className="col-2 pt-4">
                                <i className="fa-solid fa-computer"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pt-3">
                    <div className="inner-box">
                        <div className="row">
                            <div className="col-8 texts">
                                <p className="text-muted">Total Users</p>
                                <h1>{totalData.totalUsers}</h1>
                                <i className="fa-solid fa-circle-arrow-up"></i><small className="text-muted"> Since Last day</small>
                            </div>
                            <div className="col-2 pt-4">
                                <i className="fa-solid fa-users"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pt-3">
                    <div className="inner-box">
                        <div className="row">
                            <div className="col-8 texts">
                                <p className="text-muted">Total Camera</p>
                                <h1>{totalData.totalCamera}</h1>
                                <i className="fa-solid fa-circle-arrow-up"></i><small className="text-muted"> Since Last day</small>
                            </div>
                            <div className="col-2 pt-4">
                                <i className="fa-solid fa-video"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 pt-3">
                    <div className="inner-box">
                        <div className="row">
                            <div className="col-8 texts">
                                <p className="text-muted">Wires / Cables</p>
                                <h1>{totalData.totalWires}</h1>
                                <i className="fa-solid fa-circle-arrow-up"></i><small className="text-muted"> Since Last day</small>
                            </div>
                            <div className="col-2 pt-4">
                                <i className="fa-solid fa-network-wired"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-1 mb-3">
                <div className="col-md-6 chart-box mt-3">
                    <canvas id="myChart1"></canvas>
                </div>
                <div className="col-md-6 chart-box mt-3">
                    <canvas id="myChart2"></canvas>
                </div>
            </div>
        </section>
    )
}
export default DashboardView