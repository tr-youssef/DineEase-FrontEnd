import { useEffect, useState } from "react";
import { callAPI } from "../utils/FetchData.js";

function Test() {
  const [data, setData] = useState("");

  useEffect(() => {
    let fetchData = async () => {
      await callAPI("http://localhost:5001/", "GET").then((res) => {
        setData(res.message);
      });
    };
    fetchData();
  }, []);
  return <div>{data}</div>;
}

export default Test;
