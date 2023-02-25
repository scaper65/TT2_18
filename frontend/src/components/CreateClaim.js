import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import { Input, Modal, Checkbox } from 'antd';
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import hosturl from "../hosturl.js"
const API_URL = hosturl+"/insuranceClaim/add";


const CreateClaim = (props) => {
    const auth = useAuth()
    // let navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [receiptNo, setReceiptNo] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [amount, setAmount] = useState("");
    const [purpose, setPurpose] = useState("");
    const [isFollowUp, setIsFollowUp] = useState("");
    const [prevClaimId, setprevClaimId] = useState("");
    // console.log(isFollowUp)

    const handleCancel = (e) => {
        return
    }

    const handleOk = (e) => {
        axios({
            method: 'post',
            url: API_URL,
            data: {
              FirstName: firstName,
              LastName: lastName,
              receiptNo: receiptNo,
              ExpenseDate: expenseDate,
              Amount: amount,
              Purpose: purpose,
              FollowUp: isFollowUp,
              PreviousClaimID: prevClaimId,
            }
          });
    }
    

    return (
        <div>
            <Modal title="Basic Modal" open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <label for="firstName">First Name:</label>
                <Input onChange={(e) => setFirstName(e.target.value)} value={firstName} id="firstName"/>
                <label for="lastName">Last Name:</label>
                <Input onChange={(e) => setLastName(e.target.value)} value={lastName} id="lastName" />
                <label for="receiptNo">Receipt Number:</label>
                <Input onChange={(e) => setReceiptNo(e.target.value)} value={receiptNo} id="receiptNo" />
                <label for="expenseDate">Expense Date:</label>
                <Input onChange={(e) => setExpenseDate(e.target.value)}value={expenseDate} id="expenseDate" type="datetime-local"/>
                <label for="amount">Amount:</label>
                <Input onChange={(e) => setAmount(e.target.value)}value={amount} id="amount" type="number"/>
                <label for="purpose">Purpose:</label>
                <Input onChange={(e) => setPurpose(e.target.value)}value={purpose} id="purpose"/>
                <label for="followUp">Follow Up: </label>
                <Checkbox onChange={(e) => setIsFollowUp(e.target.checked)} value={isFollowUp}id="followUp"/><br/>
                {isFollowUp ? 
                    <div>
                        <label for="prevClaimId">Previous Claim ID:</label>
                        <Input onChange={(e) => setprevClaimId(e.target.value)} value={prevClaimId} id="prevClaimId"/>
                    </div> 
                : null}
            </Modal>
        </div>

    );
};

export default CreateClaim;
