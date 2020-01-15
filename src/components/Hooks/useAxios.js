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
