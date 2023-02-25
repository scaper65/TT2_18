import React from 'react';
import { Table, Button } from 'antd'

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
                <Button type="primary">
                    Edit
                </Button>
                <Button type="danger">
                    Delete
                </Button>
            </>
        ),
    },
];


const Claims = (props) => {
    /** const handleEdit = (record) => {
      // handle edit logic
      console.log('Edit claim:', record);
    };
  
    const handleDelete = (record) => {
      // handle delete logic
      console.log('Delete claim:', record);
    };*/
  
    return (
      <Table columns={columns} dataSource={props.claims} rowKey="ClaimID" />
    );
  };
export default Claims