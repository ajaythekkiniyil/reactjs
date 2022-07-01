import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Constants from '../../Constants/Constants'
const FilterableTable = require('react-filterable-table');

function TotalAssets() {
    const [allAssets, setAllAssets] = useState([])
    useEffect(() => {
        async function serverCall1() {
            const resp = await axios.get(`${Constants.apiBaseUrl}/get-all-assets`)
            if (resp) {
                setAllAssets(resp.data)
            }
        }
        serverCall1()
    }, [])
    function assetDetailsPage(uid) {
        localStorage.setItem('uid', uid)
        window.location = '/asset-details'
    }
    function handleDelete(uid) {
        const sure = window.confirm('Are you sure to delete asset')
        if (sure) {
            async function serverCall2() {
                const resp = await axios.delete(`${Constants.apiBaseUrl}/delete-asset`, { data: { uid } })
                if (resp.data.deleted) {
                    window.location.reload()
                }
            }
            serverCall2();
        }
    }
    function handleAudit(uid){
        localStorage.setItem('auditUid',uid)
        window.location= '/audit'
    }
    let data = []
    allAssets.map((items) => {
        data.push({
            asset_name: items.details.device_name,
            asset_tag: <h6 className='asset-details-a-tag' onClick={() => assetDetailsPage(items.uid)}>{items.uid}</h6>,
            brand_name: items.details.brand_name,
            memory: items.details.memory,
            processor: items.details.processor,
            graphics_card: items.details.graphics,
            refference_tag: items.details.refference_tag,
            serial_no: items.details.serial_no,
            model_name: items.details.model_name,
            company_service_tag: items.details.company_service_tag,
            model_no: items.details.model_no,
            aoc_asset_tag: items.details.aoc_tag_no,
            start_date: items.details.start_date,
            end_date: items.details.end_date,
            invoice_no: items.details.invoice_no,
            status: items.details.status,
            location: items.details.location,
            user: items.details.asset_holder,
            audit: <p className='actions' onClick={()=>handleAudit(items.uid)}>Audit <i className="fa-solid fa-file-pen"></i></p>,
            delete: <p className='actions' onClick={() => handleDelete(items.uid)}><i className="fa-solid fa-trash-can"></i></p>,
        })
    return 0;
})
const fields = [
    { name: 'asset_name', displayName: "Asset Name", inputFilterable: true, sortable: true },
    { name: 'asset_tag', displayName: "Unique ID", inputFilterable: true, sortable: true },
    { name: 'brand_name', displayName: "Brand Name", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'memory', displayName: "Memory", inputFilterable: true, sortable: true },
    { name: 'processor', displayName: "Processor", inputFilterable: true, sortable: true },
    { name: 'graphics_card', displayName: "Graphics Card", inputFilterable: true, sortable: true },
    { name: 'refference_tag', displayName: "Refference Tag", inputFilterable: true, sortable: true },
    { name: 'serial_no', displayName: "Serial No.", inputFilterable: true, sortable: true },
    { name: 'model_name', displayName: "Model Name", inputFilterable: true, sortable: true },
    { name: 'company_service_tag', displayName: "Company Service Tag", inputFilterable: true, sortable: true },
    { name: 'model_no', displayName: "Model No. / Identifier", inputFilterable: true, sortable: true },
    { name: 'aoc_asset_tag', displayName: "AOC Asset Tag", inputFilterable: true, sortable: true },
    { name: 'start_date', displayName: "Start Date", inputFilterable: true, sortable: true },
    { name: 'end_date', displayName: "End Date", inputFilterable: true, sortable: true },
    { name: 'invoice_no', displayName: "Invoice No.", inputFilterable: true, sortable: true },
    { name: 'status', displayName: "Status", inputFilterable: true, sortable: true },
    { name: 'location', displayName: "Location", inputFilterable: true, sortable: true },
    { name: 'user', displayName: "User", inputFilterable: true, sortable: true },
    { name: 'audit', displayName: "Audit", inputFilterable: true, sortable: true },
    { name: 'delete', displayName: "Delete", inputFilterable: true, sortable: true },
];
return (
    <section className='p-2 aoc-assets'>
        <div className="table-responsive">
            <FilterableTable
                namespace="Data"
                initialSort="name"
                data={data}
                fields={fields}
                noRecordsMessage="There are no data"
                noFilteredRecordsMessage="No data match your filters!"
            />
        </div>
    </section>
)
}

export default TotalAssets