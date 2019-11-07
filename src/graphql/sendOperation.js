import Axios from "./axiosConfig";
import { MOCK_API } from "../constants/ajaxConstants";

const sendOperation = query => {
    if (MOCK_API) return mockAPI()
    return Axios.post('/', query)
}

const mockAPI = query => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve({ data: { stuff: [] } })
        }, 1500)
    })
}


export default sendOperation;
