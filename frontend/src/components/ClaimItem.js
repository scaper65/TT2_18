import React from 'react'
import './ClaimItem.css';

const ClaimItem = (props) => {
    const claim = props.claim;

    return (
        <>
            <thead>
                <tr>
                    <th>Claim ID</th>
                    <th>Insurance ID</th>
                    <th>Expense Date</th>
                    <th>Amount</th>
                    <th>Purpose</th>
                    <th>Follow Up</th>
                    <th>Previous Claim ID</th>
                    <th>Status</th>
                    <th>Last Edited Claim Date</th>
                </tr>
            </thead>
            
            <tbody>
                <tr>
                    <td className='tableData'>{claim.ClaimID}</td>
                    <td className='tableData'>{claim.InsuranceID}</td>
                    <td className='tableData'>{claim.ExpenseDate}</td>
                    <td className='tableData'>{claim.Amount}</td>
                    <td className='tableData'>{claim.Purpose}</td>
                    <td className='tableData'>{claim.FollowUp}</td>
                    <td className='tableData'>{claim.PreviousClaimID}</td>
                    <td className='tableData'>{claim.Status}</td>
                    <td className='tableData'>{claim.LastEditedClaimDate}</td>
                </tr>
            </tbody>

        </>
        
    )
}

export default ClaimItem