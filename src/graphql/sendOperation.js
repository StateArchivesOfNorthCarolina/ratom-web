import Axios from "./axiosConfig";
import { MOCK_API } from "../constants/ajaxConstants";

const sendOperation = query => {
  if (MOCK_API) return mockAPI();
  return Axios.post("/", query);
};

const mockAPI = query => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({
        data: [
          { collectionId: 1, name: "Collection 1", date: "1/1/2019" },
          { collectionId: 2, name: "Collection 2", date: "9/9/2015" }
        ]
      });
    }, 1500);
  });
};

export default sendOperation;
