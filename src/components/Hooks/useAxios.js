import { makeUseAxios } from 'axios-hooks';
import Axios from '../../services/axiosConfig';

const useAxios = makeUseAxios({
  axios: Axios
});

export default useAxios;
