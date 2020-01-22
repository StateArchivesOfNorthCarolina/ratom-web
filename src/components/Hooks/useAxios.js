// import { useState, useEffect } from 'react';

// export const useAxios = (ajaxMethod, config = {}) => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();

//   const { conditionals = [], onError, onCompleted } = config;

//   const args = config.args;

//   useEffect(() => {
//     setLoading(true);
//     setError(null);
//     ajaxMethod(args)
//       .then(response => {
//         setError(null);
//         setData(response.data);
//         setLoading(false);
//         if (onCompleted) onCompleted(response.data);
//       })
//       .catch(error => {
//         // TODO: Handle errors better
//         setError(error);
//         console.warn(error);
//         if (onError) onError(error);
//       });
//   }, [...conditionals]);

//   return { error, loading, data };
// };

// export const useLazyAxios = (ajaxMethod, config = {}) => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState();

//   const execute = (...ajaxArgs) => {
//     setLoading(true);
//     setError(null);
//     ajaxMethod(...ajaxArgs)
//       .then(response => {
//         setError(null);
//         setData(response.data);
//         setLoading(false);
//         if (config.onCompleted) config.onCompleted(response.data);
//       })
//       .catch(error => {
//         // TODO: Handle errors better
//         setError(error);
//         setData();
//         setLoading(false);
//         console.warn(error);
//         if (config.onError) config.onError(error);
//       });
//   };

//   return [execute, { error, loading, data }];
// };

import { makeUseAxios } from 'axios-hooks';
import Axios from '../../services/axiosConfig';

const useAxios = makeUseAxios({
  axios: Axios
});

export default useAxios;
