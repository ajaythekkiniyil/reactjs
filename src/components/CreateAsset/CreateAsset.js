import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import axios from 'axios'
import Constants from '../../Constants/Constants'

function CreateAsset() {
    const [details, setDetails] = useState({})
    const [assetImage, setAssetImage] = useState()
    const [assetInvoice, setAssetInvoice] = useState()
    const [assetImageURL, setAssetImageURL] = useState('')
    const [randomNum, setrandomNum] = useState('')
    const [UID, setUID] = useState('')

    useEffect(() => {
        // verify token
        const Token = localStorage.getItem('token');
        if (!Token) {
            window.location = '/admin'
        }
        async function serverCall1() {
            const resp = await axios.get(`${Constants.apiBaseUrl}/verify-user`, {
                headers: {
                    'authToken': localStorage.getItem('token')
                }
            })
            if (!resp.data.userVerified) {
                window.location = "/admin"
            }
        }
        serverCall1()

        // generating uniqueId and setting UID
        let d = new Date()
        let date = d.getDate()
        let month = d.getMonth() + 1
        let year = d.getFullYear()
        let hour = d.getHours()
        let minutes = d.getMinutes()
        let second = d.getSeconds()
        let randomNum = date + '' + month + '' + '' + year + '' + hour + '' + minutes + '' + second
        setrandomNum(randomNum)
        setUID(`${'asset-' + details.category + '-' + randomNum}`)
    }, [details.category])

    function handleStoreDetails(e) {
        setDetails(prevDetails => (
            { ...prevDetails, [e.target.name]: e.target.value }
        ))
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", assetImage);
        formData.append("invoice", assetInvoice);
        formData.append("details", JSON.stringify(details));
        formData.append("uid", UID);

        try {
            async function serverCall2() {
                const response = await axios.post(
                    `${Constants.apiBaseUrl}/create-asset`,
                    formData
                )
                if (response.data) {
                    alert('New Asset Created')
                    window.location = '/dashboard'
                }
            }
            serverCall2()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section>
            <Navbar />
            <div className="create-asset">
                <h5 className="title">Create Asset</h5>

                <div className="data-form">
                    <div className="row">
                        <div className="col-md-8">
                            <form onSubmit={(e) => handleFormSubmit(e)}>

                                <div className="row">
                                    <div className="col-5 mt-3">Device Name</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="device_name"
                                            value={details.device_name}

                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Category</div>
                                    <div className="col-7 mt-3">
                                        <select
                                            name="category"
                                            value={details.category}

                                            onChange={(e) => handleStoreDetails(e)}
                                        >
                                            <option>- Select -</option>
                                            <option value="cpu">CPU</option>
                                            <option value="monitor">Monitor</option>
                                            <option value="laptop">Laptop</option>
                                            <option value="camera">Camera</option>
                                            <option value="keyboard">Keyboard</option>
                                            <option value="mouse">Mouse</option>
                                            <option value="headset">Headset</option>
                                            <option value="hard-disk">Hard Disk</option>
                                            <option value="wires">Wires / Adaptors / Extentions</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>

                                    <div className="col-5 mt-3">Brand Name</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="brand_name"

                                            value={details.brand_name}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Location</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="location"
                                            value={details.location}

                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Asset Unique ID (Auto Generated)</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="uid"
                                            value={`${'asset-' + details.category + '-' + randomNum}`}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Memory</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="memory"
                                            value={details.memory}

                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Processor</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="processor"

                                            value={details.processor}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Graphics Card</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="graphics"

                                            value={details.graphics}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Refference Tag</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="refference_tag"

                                            value={details.refference_tag}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Serial Number</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="serial_no"

                                            value={details.serial_no}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Model Name</div>
                                    <div className="col-7 mt-3">
                                        <input type="text"
                                            name="model_name"

                                            value={details.model_name}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Company Service Tag</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="company_service_tag"

                                            value={details.company_service_tag}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Model No. / Identifier</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="model_no"

                                            value={details.model_no}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">AOC Tag No.</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="aoc_tag_no"
                                            value={details.aoc_tag_no}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Start Date</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={details.start_date}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">End Date</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="date"
                                            name="end_date"
                                            value={details.end_date}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Invoice No.</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="invoice_no"
                                            value={details.invoice_no}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Status</div>
                                    <div className="col-7 mt-3">
                                        <input
                                            type="text"
                                            name="status"
                                            value={details.status}
                                            onChange={(e) => handleStoreDetails(e)}
                                        />
                                    </div>

                                    <div className="col-5 mt-3">Notes</div>
                                    <div className="col-7 mt-3">
                                        <textarea name="notes" cols="38" rows="3"
                                            value={details.notes}
                                            onChange={(e) => handleStoreDetails(e)}>
                                        </textarea>
                                    </div>

                                    <div className="col-5 mt-3">Upload Image</div>
                                    <div className="col-7 mt-3">
                                        <input type="file" accept="image/jpeg, image/png" className="p-0" name="asset_image" required onChange={(e) => {
                                            if ((!e.target.files[0].type.match('image/png')) && (!e.target.files[0].type.match('image/jpeg'))) {
                                                alert('Accepted filetypes are jpg, png')
                                                e.target.value = ''
                                            }
                                            else {
                                                setAssetImage(e.target.files[0])
                                                setAssetImageURL(URL.createObjectURL(e.target.files[0]))
                                            }
                                        }
                                        } />
                                        <small className="text-danger">Accepted filetypes are jpg, png</small>
                                    </div>

                                    <div className="col-5 mt-3">Upload Invoice</div>
                                    <div className="col-7 mt-3">
                                        <input type="file" accept="application/pdf" className="p-0" name="invoice" required onChange={(e) => {
                                            if (!e.target.files[0].type.match('application/pdf')) {
                                                alert('Accepted filetypes is pdf')
                                                e.target.value = ''
                                            }
                                            else {
                                                setAssetInvoice(e.target.files[0])
                                            }
                                        }} />
                                        <small className="text-danger">Accepted filetypes is pdf</small>
                                    </div>

                                    <div className="col-5 mt-3"></div>
                                    <div className="col-7 mt-3">
                                        <div className="row">
                                            <div className="col-4 col-md-3 p-2"><a style={{ textDecoration: 'none' }} href="/dashboard">Cancel</a> </div>
                                            <div className="col-8 col-md-6"><button className="btn savebtn"><i className="fa-solid fa-check"></i> Save</button></div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4 mt-5 mt-lg-0">
                            <div className="row">
                                <div className="col-12">
                                    <img className="img-fluid" src={assetImageURL} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}
export default CreateAsset