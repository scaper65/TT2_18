import React from 'react';
import { useState } from 'react';
import { Table, Button } from 'antd'
import axios from "axios"; 
import { useAuth } from "../contexts/authContext"; 
import hosturl from "../hosturl.js" 
import { useEffect } from 'react';
const API_URL = hosturl + "/insuranceClaim/delete/";

const Claims = (props) => {
    const auth = useAuth(); 
    const [ claims, setClaims ] = useState(props.claims);
    useEffect(() => { 
        setClaims(props.claims); 
      }, [props.claims]);

    const handleDelete = (record) => { 
        // Create a new array of claims excluding the one to be deleted 
        const updatedClaims = claims.filter(claim => claim.ClaimID !== record.ClaimID); 
        // Call a function to update the claims in your app state or database 

        axios({ 
            method: 'delete', 
            url: API_URL+record.ClaimID}); 
        setClaims(updatedClaims);
        console.log('Delete claim:', record); 
    };

    const columns = [
        {
            title: 'Claim ID',
            dataIndex: 'ClaimID',
            key: 'ClaimID',
        },
        {
            title: 'InsuranceID',
            dataIndex: 'InsuranceID',
            key: 'InsuranceID',
        },
        {
            title: 'FirstName',
            dataIndex: 'FirstName',
            key: 'FirstName',
        },
        {
            title: 'LastName',
            dataIndex: 'LastName',
            key: 'LastName',
        },
        {
            title: 'ExpenseDate',
            dataIndex: 'ExpenseDate',
            key: 'ExpenseDate',
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
        },
        {
            title: 'Purpose',
            dataIndex: 'Purpose',
            key: 'Purpose',
        },
        {
            title: 'FollowUp',
            dataIndex: 'FollowUp',
            key: 'FollowUp',
        },
        {
            title: 'PreviousClaimID',
            dataIndex: 'PreviousClaimID',
            key: 'PreviousClaimID',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
        },
        {
            title: 'LastEditedClaimDate',
            dataIndex: 'LastEditedClaimDate',
            key: 'LastEditedClaimDate',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    {record.Status !== "Approved" ? (
                        <Button type="primary">
                            Edit
                        </Button>
                    ) : null}
                    {record.Status !== "Approved" ? (
                        <Button type="danger" onClick={() => handleDelete(record)}>
                            Delete
                        </Button>
                    ) : null}
                </>
            ),
        },
    ];


    return (
        <Table columns={columns} dataSource={claims} rowKey="ClaimID"/>
    );
};

export default Claims