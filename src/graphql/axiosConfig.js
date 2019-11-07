import axios from "axios";


const Axios = axios.create({
    baseURL: 'http://localhost:8000/graphql',
    timeout: 1000,
    headers: { 'Accept': 'application/json' }
});


export default Axios
