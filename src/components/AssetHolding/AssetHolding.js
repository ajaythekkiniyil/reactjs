import axios from 'axios'
import { useEffect, useState } from 'react'
import UserNavbar from '../Navbar/UserNavbar'
import constants from '../../Constants/Constants.js'
function AssetHolding() {
  useEffect(() => {
    // verify token
    const Token = localStorage.getItem('userToken');
    if (!Token) {
      window.location = '/'
    }
    async function verifyUser() {
      const resp = await axios.get(`${constants.apiBaseUrl}/verify-user`, {
        headers: {
          'authToken': Token
        }
      })
      if (!resp.data.userVerified) {
        window.location = "/"
      }
    }
    verifyUser()
    
    async function serverCall() {
      const response = await axios.get(`${constants.apiBaseUrl}/assets-holdings`, {
        params: {
          username: localStorage.getItem('username')
        }
      })
      if (response) {
        setAssetHoldings(response.data)
      }
    }
    serverCall()
  }, [])
  const [assetsHoldings, setAssetHoldings] = useState([

  ])
  return (
    <section className='asset-holdings'>
      <UserNavbar />
      <div className="container">
        <h5 className='title'>Assets Holdings</h5>
        {/* ternory operation */}
        {
          assetsHoldings.length === 0
            ? <div className="asset-items-box">Asset holding is empty..</div>
            :
            <div className="asset-items-box">
              {
                assetsHoldings.map((eachAsset, index) => {
                  const assetImageUrl = `${constants.serverDomain + '/server/assetImages/' + eachAsset.uid + '.jpg'}`
                  return (
                    <div className="row" key={index}>
                      <div className="col-lg-3 pt-3 pb-3">
                        <img className='img-fluid' src={assetImageUrl} alt="" />
                      </div>
                      <div className="col-lg-9 pt-3 pb-3 details-scroll">
                        <p><span className='status' style={{ color: 'green' }}>{eachAsset.details.status}</span></p>
                        <p><span className="short-span">Device Name: </span>{eachAsset.details.device_name}</p>
                        <p><span className="short-span">Category: </span>{eachAsset.details.category}</p>
                        <p><span className="short-span">Brand Name: </span>{eachAsset.details.brand_name}</p>
                        <p><span className="short-span">Location: </span>{eachAsset.details.location}</p>
                        <p><span className="short-span">Memory: </span>{eachAsset.details.memory}</p>
                        <p><span className="short-span">Processor: </span>{eachAsset.details.processor}</p>
                        <p><span className="short-span">Graphics: </span>{eachAsset.details.graphics}</p>
                        <p><span className="short-span">Refference_tag: </span>{eachAsset.details.refference_tag}</p>
                        <p><span className="short-span">Company service tag: </span>{eachAsset.details.company_service_tag}</p>
                        <p><span className="short-span">Model no: </span>{eachAsset.details.model_no}</p>
                        <p><span className="short-span">AOC tag no: </span>{eachAsset.details.aoc_tag_no}</p>
                        <p><span className="short-span">Start date: </span>{eachAsset.details.start_date}</p>
                        <p><span className="short-span">End date: </span>{eachAsset.details.end_date}</p>
                        <p><span className="short-span">Invoice no: </span>{eachAsset.details.invoice_no}</p>
                        <p><span className="short-span">Notes: </span>{eachAsset.details.notes}</p>
                        <p><span className="short-span">Unique Id: </span>{eachAsset.uid}</p>
                      </div>
                      <hr />
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </section >
  )
}

export default AssetHolding