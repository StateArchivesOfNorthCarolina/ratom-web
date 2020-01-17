import axios from 'axios';
import Axios from '../../services/axiosConfig';
import { useState, useEffect } from 'react';

export const useAxios = (ajaxMethod, config = {}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  config.conditionals = config.conditionals || [];
  config.arguments = config.arguments || [];

  useEffect(() => {
    setLoading(true);
    setError(null);
    ajaxMethod(...config.arguments)
      .then(response => {
        setError(null);
        setData(response.data);
        setLoading(false);
        if (config.onCompleted) config.onCompleted(response.data);
      })
      .catch(error => {
        // TODO: Handle errors better
        setError(error);
        console.warn(error);
        if (config.onError) config.onError(error);
      });
  }, [...config.conditionals]);

  return { error, loading, data };
};

export const useLazyAxios = (ajaxMethod, config = {}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const execute = (...ajaxArgs) => {
    setLoading(true);
    setError(null);
    ajaxMethod(...ajaxArgs)
      .then(response => {
        setError(null);
        setData(response.data);
        setLoading(false);
        if (config.onCompleted) config.onCompleted(response.data);
      })
      .catch(error => {
        // TODO: Handle errors better
        setError(error);
        setData();
        setLoading(false);
        console.warn(error);
        if (config.onError) config.onError(error);
      });
  };

  return [execute, { error, loading, data }];
};

/**
 *
 * @param {function} request - The request method to poll on
 * @param {Object} config - A configuration Objedt
 * @param {number} [config.timeout=Infinity] - In milliseconds, how long to poll before quiting.
 * @param {number} [config.interval=1000]- In milliseconds, interval between requests.
 * @param {object} [config.condition] - A condition that if met, will terminate polling.
 * @param {string} [config.condition.conditional] - e.g. 'data.status'
 * @param {*} [config.condition.value=true] - e.g. What ^ data.status must equal for condition to be met.
 */
export const useAxiosPolling = (requestFn, config = {}) => {
  const MAX_CONDITONAL_DEPTH = 4;
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isPolling, setIsPolling] = useState(false);
  const [shouldCancel, setShouldCancel] = useState(false);

  const CancelToken = axios.CancelToken;
  let cancelRequest;

  const endTime = Number(new Date()) + (config.timeout || 1000);
  config.interval = config.interval || Infinity;
  const keys = config.condition && config.condition.conditional.split('.');
  if (keys.length > MAX_CONDITONAL_DEPTH) {
    throw new Error(
      `Conditional "${config.condition.conditional} exceeds maximum object depth of ${MAX_CONDITONAL_DEPTH}"`
    );
  }
  const conditionMetValue = config.condition && config.condition.value;

  const getConditionMet = ajaxResponse => {
    // if (ajaxResponse.hasOwnProperty(''))
  };

  const executePoll = (resolve, reject) => {
    const sendRequest = requestFn();

    sendRequest.then(response => {
      // if (response.data[])
    });
  };

  const cancelPolling = () => {
    setShouldCancel(true);
    cancelRequest();
  };

  // var endTime = Number(new Date()) + (timeout || 2000);
  // interval = interval || 100;

  // var checkCondition = function(resolve, reject) {
  //   var ajax = fn();
  //   // dive into the ajax promise
  //   ajax.then(function(response) {
  //     // If the condition is met, we're done!
  //     if (response.data.var == true) {
  //       resolve(response.data.var);
  //     }
  //     // If the condition isn't met but the timeout hasn't elapsed, go again
  //     else if (Number(new Date()) < endTime) {
  //       setTimeout(checkCondition, interval, resolve, reject);
  //     }
  //     // Didn't match and too much time, reject!
  //     else {
  //       reject(new Error('timed out for ' + fn + ': ' + arguments));
  //     }
  //   });
  // };

  // return new Promise(checkCondition);
  return [startPolling, cancelPolling, { data, error, isPolling }];
};
