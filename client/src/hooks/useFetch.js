import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState();

  const fetchData = async (url) => {
    const _data = await axios.get(url);
    setData(_data);
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { data };
}

export default useFetch;
