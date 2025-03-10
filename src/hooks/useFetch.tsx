import React from "react";

interface IError {
  ok: boolean;
  status: number | string;
  statusText: string;
  type: string;
  url: string;
}

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState<IError | null>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const request = React.useCallback(async (url: string, options: {}) => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (err: any) {
      json = response;
      setError(response);
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
