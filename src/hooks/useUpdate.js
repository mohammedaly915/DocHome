import axios from "axios";
import { useState } from "react";

export const useUpdate = (url, token = null) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateData = async (body) => {
    setLoading(true);
    try {
      const response = await axios.put(url, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      console.error(err);
    }
  };

  return { data, loading, error, updateData };
};
