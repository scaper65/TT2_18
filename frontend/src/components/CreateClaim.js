import React, { useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { Input, Modal, Checkbox, Select, Alert } from 'antd';
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import hosturl from "../hosturl.js"
const ADD_API_URL = hosturl+"/insuranceclaim/add";
const GET_CLAIM_API_URL = hosturl+"/insuranceclaim/getall";
const GET_POLICY_API_URL = hosturl+"/insurancepolicy/getall";



const CreateClaim = (props) => {
    const auth = useAuth()
    // let navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [receiptNo, setReceiptNo] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [amount, setAmount] = useState("");
    const [purpose, setPurpose] = useState("")
    const [isFollowUp, setIsFollowUp] = useState(false);
    const [prevClaimId, setPrevClaimId] = useState("");
    const [insuranceId, setInsuranceId] = useState("");
    const [insuranceOptions, setInsuranceOptions] = useState([]);
    const [error, setError] = useState("");
    
    // console.log(isFollowUp)


    let options = [
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' }
    ]
    var config = {}
        if(auth.user !== null){
            const bearer_token = `Bearer ${auth.user.token}`
            config = {
                headers:{
                    Authorization: bearer_token
                }
              };
    
        }

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = () => {
        var config = {}
        if(auth.user !== null){
            const bearer_token = `Bearer ${auth.user.token}`
            config = {
                headers:{
                    Authorization: bearer_token
                }
              };
    
        }
        axios({
            method: 'get',
            url: GET_POLICY_API_URL,
            responseType: 'json',
            headers:config.headers
          })
            .then(function (response) {
              console.log(response)
              let options = response.data.map((e) => {let s = {value:e.InsuranceID,label:e.InsuranceID};return s})
              setInsuranceOptions(options)
            });
      };
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: GET_POLICY_API_URL,
    //         responseType: 'json',
    //         headers:config.headers
    //       })
    //         .then(function (response) {
    //           console.log(response)
    //           insuranceOptions2 = response.data.map((e) => {let s = {value:e.InsuranceID,label:e.InsuranceID};return s})
              
    //         });
    //   });



    const [prevClaimOptions,setPrevClaimOptions] = useState(options);



    const handleOk = (e) => {
        axios({
            method: 'post',
            url: ADD_API_URL,
            data: {
              FirstName: firstName,
              LastName: lastName,
              receiptNo: receiptNo,
              ExpenseDate: expenseDate,
              Amount: amount,
              Purpose: purpose,
              FollowUp: isFollowUp,
              PreviousClaimID: prevClaimId,
              InsuranceID: insuranceId
            },
            headers:config.headers
          }).then(function (response) {
            console.log(response)
            window.location.reload();
            props.onCancel(e)
          }).catch(function (err) {
            console.log(err)
            setError("Failed to add claim")
          });
          props.onCancel(e)
    }

    const onChangeFollowUp = (e) => {
        setIsFollowUp(e.target.checked)
        axios({
            method: 'get',
            url: GET_CLAIM_API_URL,
            responseType: 'json',
            headers:config.headers
          })
            .then(function (response) {
              console.log(response)
              let options = response.data.map((e) => {let s = {value:e.ClaimID,label:e.ClaimID};return s})
              setPrevClaimOptions(options)
            }).catch(function (err) {
                console.log(err)
            })
    }
    

    return (
        <div>
            <Modal title="Basic Modal" open={props.isModalOpen} onOk={handleOk} onCancel={props.onCancel}>
                {error ? <Alert message={error} type="error" /> : null}
                <label for="prevClaimId">Insurance ID:</label>
                {/* <Select
                    style={{ width: 120 }}
                    onChange={(e) => setInsuranceId(e)}
                    options={insuranceOptions}
                /> */}
                <Input onChange={(e) => setInsuranceId(e.target.value)} value={insuranceId} id="firstName"/>
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
                <label for="followUp">Follow Up:</label>
                <Checkbox onChange={onChangeFollowUp} value={isFollowUp}id="followUp"/><br/>
                {isFollowUp ? 
                    <div>
                        <label for="prevClaimId">Previous Claim ID:</label>
                        {/* <Select
                            style={{ width: 120 }}
                            onChange={(e) => setPrevClaimId(e)}
                            options={prevClaimOptions}
                        /> */}
                        <Input onChange={(e) => setPrevClaimId(e.target.value)} value={prevClaimId} id="prevClaimId"/>
                    </div> 
                : null}
            </Modal>
        </div>

    );
};

export default CreateClaim;
