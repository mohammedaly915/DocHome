import axios from "axios";
import { useEffect, useState } from "react";



export const useFetch=(url,token=null)=>{

    const [data,setData]= useState()
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchData=async()=>{
        try{
            const data = await axios.get(url,{
                params:token ? { token } : {}
            });
            setData(data.data)
            setLoading(false)
        }catch(err){
            setLoading(false)
            setError(err)
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData()       
    },[url])

    return {data,loading,error};

}