const currhost = window.location.hostname; 

var newhost=""; 
if(currhost.includes("localhost")){
     newhost = "http://127.0.0.1:5000"
}

export default newhost; 