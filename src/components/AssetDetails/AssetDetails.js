import { useEffect, useState } from 'react'
import axios from 'axios'
import QRcode from 'qrcode'
import Constants from '../../Constants/Constants'
import Navbar from '../Navbar/Navbar'
function AssetDetails() {
    const toDayDate = new Date().getFullYear() + '-' + '0' + ((new Date().getMonth())+1) + '-' + new Date().getDate()
    // const [AuditPopUp, setAuditPopUp] = useState(false)
    const [editButtonClick, setEditButtonClick] = useState(false)
    const [users, setUsers] = useState([])
    const [assetHolder, setAssetHolder] = useState('')
    const [qrcode, setQrcode] = useState('')
    const [assetHistory, setAssetHistory] = useState([
        { user: '', createdTime: '' }
    ])
    const [auditHistory, setAuditHistory] = useState([
        // {nextAudit:'',notes:''}
    ])
    const [asset, setAsset] = useState({
        aoc_tag_no: "",
        brand_name: "",
        category: "",
        company_service_tag: "",
        device_name: "",
        end_date: "",
        graphics: "",
        invoice_no: "",
        location: "",
        memory: "",
        model_name: "",
        model_no: "",
        notes: "",
        processor: "",
        refference_tag: "",
        serial_no: "",
        start_date: "",
        status: "",
        asset_holder: "",
        imageUrl: "",
        invoiceUrl: "",
    })
    useEffect(() => {
        // verify token
        const Token = localStorage.getItem('token');
        if (!Token) {
            window.location = '/admin'
        }
        async function serverCall1() {
            const response = await axios.get(`${Constants.apiBaseUrl}/verify-admin`, {
                headers: {
                    'authToken': localStorage.getItem('token')
                }
            })
            if (!response.data.adminVerified) {
                window.location = "/admin"
            }
        }
        serverCall1()

        // get specific asset details
        async function serverCall2() {
            await axios.get(`${Constants.apiBaseUrl}/asset-details`,
                {
                    params: {
                        uid: localStorage.uid
                    }
                }).then(response => {
                    setAssetHistory(response.data.asset.history)
                    setAsset(response.data.asset.details)
                    setUsers(response.data.totalUsers)

                    if(response.data.asset.audits){
                        setAuditHistory(response.data.asset.audits)
                    }
                })
        }
        serverCall2()

    }, [])
    function handleChange(e) {
        setAsset((prevS) => (
            { ...prevS, [e.target.name]: e.target.value }
        ))
    }
    function updateAsset() {
        const date = new Date().toString()
        axios.put(`${Constants.apiBaseUrl}/update-asset`,
            {
                asset,
                uid: localStorage.uid,
                assetHolder,
                date,
            }
        )
        window.location = '/dashboard'
    }
    function generateQR() {
        const qrValues = {
            device_name: asset.device_name,
            // uid: localStorage.uid,
            location: asset.location,
            asset_holder: asset.asset_holder,
        }
        QRcode.toDataURL(JSON.stringify(qrValues)).then((qrcodeUrl) => setQrcode(qrcodeUrl))
    }
    return (
        <section>
            <Navbar />
            <div className="asset-details">
                <h5 className="title">Asset Details</h5>
                <div className="row">
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-4"><p className='short-span'>Status</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p><i className="fa-solid fa-circle" style={{ color: "#207403" }}></i> {asset.status}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.status} name='status' onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Device Name</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.device_name}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.device_name} name="device_name" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Category</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.category}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.category} name="category" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Brand Name</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.brand_name}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.brand_name} name="brand_name" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Location</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.location}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.location} name="location" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Memory</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.memory}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.memory} name="memory" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Processor</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.processor}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.processor} name="processor" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Graphics</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.graphics}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.graphics} name="graphics" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Refference Tag</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.refference_tag}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.refference_tag} name="refference_tag" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Serial No.</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.serial_no}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.serial_no} name="serial_no" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Model Name</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.model_name}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.model_name} name="model_name" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Company Service Tag</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.company_service_tag}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.company_service_tag} name="company_service_tag" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>model_no</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.model_no}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.model_no} name="model_no" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>AOC Tag No.</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.aoc_tag_no}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.aoc_tag_no} name="aoc_tag_no" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Start Date</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.start_date}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.start_date} name="start_date" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>End Date</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.end_date}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.end_date} name="end_date" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Invoice No.</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.invoice_no}</p>}
                                {editButtonClick && <input type="text" className='input_editable' value={asset.invoice_no} name="invoice_no" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Notes</p></div>
                            <div className="col-8">
                                {!editButtonClick && <p>{asset.notes}</p>}
                                {editButtonClick && <textarea className='input_editable' value={asset.notes} name="notes" onChange={(e) => handleChange(e)} />}
                            </div>

                            <div className="col-4"><p className='short-span'>Invoice</p></div>
                            <div className="col-8">
                                <div className="pdf_block">
                                    <i className="fa-solid fa-file-pdf"></i>
                                    You can
                                    <a target="_blank" rel='noreferrer' className='pdf_download' href={`${asset.invoiceUrl}`}> Download</a><br />
                                </div>
                            </div>

                            <div className="col-4"><p className='short-span'>Label</p></div>
                            <div className="col-8">
                                <button className="btn-qrcode" onClick={generateQR}>Generate Label</button>
                            </div>

                            <div className="col-4 pt-3"><p className='short-span'>Assign To</p></div>
                            <div className="col-8 pt-3">
                                {!editButtonClick && <p>{asset.asset_holder}</p>}
                                {editButtonClick &&
                                    <select className="form-select" onClick={(e) => setAssetHolder(e.target.value)}>
                                        <option>- Select -</option>
                                        {
                                            users.map((eachUser, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={eachUser.username}>{eachUser.username}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                            </div>
                            <div className="col-4 pt-3"><p></p></div>
                            <div className="col-8 pt-3">
                                {
                                    // ternory condition
                                    editButtonClick ? <span onClick={() => setEditButtonClick((prevS) => !prevS)} style={{ cursor: "pointer" }}><i className="fa-solid fa-xmark edit-and-save cancel-btn"></i> Cancel</span> : <span onClick={() => setEditButtonClick((prevS) => !prevS)} style={{ cursor: "pointer" }}> <i className="fa-solid fa-pen-to-square edit-and-save edit-btn"></i> Edit</span>
                                }
                                {editButtonClick && <span style={{ cursor: 'pointer' }} onClick={updateAsset}><i className="fa-solid fa-circle-check edit-and-save save-btn" ></i> Save</span>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 assets-img">
                        <img src={asset.imageUrl} alt="" className="img-fluid mt-4" /> <br />
                        {qrcode && <img src={qrcode} alt="" className="label mt-4" />}

                        <div className="asset-history">
                            <h5>Asset Movement</h5>
                            <hr></hr>
                            {
                                assetHistory.map((items, index) => (
                                    <div key={index}>
                                        {items.createdTime && <p><span>Asset Created at: </span>{items.createdTime}</p>}
                                        {items.updatedTime && <p><span>Assigned to: </span><u>{items.user}</u> at {items.updatedTime}</p>}
                                    </div>
                                ))
                            }
                        </div>
                        {/* Audit History */}
                        <div className="audit-history-box">
                            <h5 className='audit-history' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Audti History <i class="fa-solid fa-chevron-down"></i>
                            </h5>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    {
                                        auditHistory.map((auditHistory, index) => {
                                            return (
                                                <>
                                                    <span className='short-span'>Previous Audit date: {auditHistory.previousAudit}</span>
                                                    <span className='short-span'>Note: {auditHistory.notes}</span>
                                                    <span className='short-span'>Next Audit date: {auditHistory.nextAudit}</span>
                                                    <hr />
                                                    {auditHistory.nextAudit == toDayDate && alert("Asset need to audit") }
                                                </>
                                            )
                                        })
                                    }
                                    {
                                        auditHistory.length === 0 && <>No data...</>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AssetDetails