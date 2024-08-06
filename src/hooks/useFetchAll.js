import axios from "axios";
import { useEffect, useState } from "react";

const useFetchAll = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = "GET", requestData = null, token = null) => {
    setLoading(true);
    try {
      const config = {
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        data: requestData,
      };

      const res = await axios(config);
      setResponse(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : err.message);
    }
  };

  // Use useEffect for GET requests only
//   useEffect(() => {
//     const fetchDataWithEffect = async () => {
//       if (url && method === "GET") {
//         fetchData(url, method, requestData, token);
//       }
//     };

//     fetchDataWithEffect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url]); // Dependency array only includes url for GET requests

  const getData = (url, token = null) => {
    fetchData(url, "GET", null, token);
  };

  const postData = (url, data, token = null) => {
    fetchData(url, "POST", data, token);
  };

  const putData = (url, data, token = null) => {
    fetchData(url, "PUT", data, token);
  };

  const deleteData = (url, token = null) => {
    fetchData(url, "DELETE", null, token);
  };

  return { response, loading, error, getData, postData, putData, deleteData };
};

export default useFetchAll;
