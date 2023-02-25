import React from "react";
// import ExchangeRateService from "../services/exchangeRate.service";
import axios from "axios";
import hosturl from "../hosturl.js"
import { useAuth } from "../contexts/authContext.js";
const Home = () => {
    const auth = useAuth(); 
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
    
    // simple get request that manually add config. Since some API endpoint can be access without user authentication
    async function getProtectedRoute(){
        try {
            const response = await axios.get( hosturl + '/user/protected', config);
            console.log(response.data);
          } catch (error) {
            console.error(error.response.data);
          }
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-container">
                            

                            <div className="mb-3 d-grid">
                                <button className="btn btn-primary" onClick={getProtectedRoute}>
                                    <span>Get Protected Route</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
};

export default Home;
