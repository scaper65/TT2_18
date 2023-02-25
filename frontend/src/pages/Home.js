import React, { useEffect, useState } from "react";
// import ExchangeRateService from "../services/exchangeRate.service";
import axios from "axios";
import hosturl from "../hosturl.js"
import { useAuth } from "../contexts/authContext.js";
import Claims from '../components/Claims';
import { FloatButton } from 'antd';
import CreateClaim from "../components/CreateClaim.js";
const API_URL = hosturl+'/insuranceclaim/';

const Home = () => {
    const [ claims, setClaims ] = useState();
    const auth = useAuth(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
      // get request
    

    // if user is logged in, get token and set authorization headers with token. 
    // This is to call protected API endpoint that requires user authentication
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
        auth.user && allClaims();
    }, [auth.user])

    const allClaims = () => {
        console.log(API_URL + 'getall');
        axios.get(API_URL + 'getall', config)
        .then((response) => {
            setClaims(response.data);
            return response.data;
        });
    }

    return (
        <>
            <div className="container">
                {/* <FloatButton
                    shape="circle"
                    type="primary"
                    style={{ right: 94 }}
                    // icon={<CustomerServiceOutlined />}
                    onClick = {() => setIsModalOpen(true)}
                /> */}
                <CreateClaim isModalOpen={isModalOpen} onCancel={() => setIsModalOpen(false)}/>
                

                <Claims claims={claims} setClaims={setClaims} />
            </div>
        </>
        
    );
};

export default Home;
