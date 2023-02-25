import React, { useEffect, useState } from "react";
// import ExchangeRateService from "../services/exchangeRate.service";
import axios from "axios";
import hosturl from "../hosturl.js"
import { useAuth } from "../contexts/authContext.js";
import Claims from '../components/Claims';
const API_URL = hosturl+'/insuranceclaim/';

const Home = () => {
    const [ claims, setClaims ] = useState();
    const auth = useAuth(); 

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
        axios.get(API_URL + 'getall', config)
        .then((response) => {
            setClaims(response.data);
            return response.data;
        });
    }

    return (
        <>
            <Claims claims={claims} setClaims={setClaims} />
        </>
        
    );
};

export default Home;
