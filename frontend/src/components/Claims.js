import React from 'react';
import { Table, Button } from 'antd'

const Claims = (props) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [record, setRecord] = useState({});

    const handleDelete = (record) => {
        // Create a new array of claims excluding the one to be deleted
        const updatedClaims = props.claims.filter(claim => claim.ClaimID !== record.ClaimID);
        // Call a function to update the claims in your app state or database
        updateClaims(updatedClaims);
        console.log('Delete claim:', record);
    };

    const handleEdit = (record) => {
        setRecord(record);
        setIsEditModalOpen(true);
    }

    const updateClaims = (updatedClaims) => {
        // Update the claims in your app state or database
        // This is just an example and will depend on how you're managing state
        props.setClaims(updatedClaims);
    }

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
                        <Button type="primary" onClick={() => handleEdit(record)}>
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
        <>
            <Table columns={columns} dataSource={props.claims} rowKey="ClaimID" />
            <EditClaim isModalOpen={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} record={record} />        
        </>
    );
};

export default Claims