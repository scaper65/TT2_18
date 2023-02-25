import React from 'react';
import ClaimItem from './ClaimItem';
const Claims = (props) => {
    return (
        <div class="table-responsive">
            <table class='table table-bordered'>
                {
                    props.claims.map(claim => (
                        <ClaimItem key={claim.ClaimID} claim={claim} />
                    ))
                }
            </table>
        </div>
        
    )
}

export default Claims