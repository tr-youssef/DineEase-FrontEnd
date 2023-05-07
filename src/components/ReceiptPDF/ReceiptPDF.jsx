import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PDFViewer } from "@react-pdf/renderer";
import BillReceipt from "../billReceipt/BillReceipt";
import { callAPI } from "../../utils/FetchData";
import { useParams } from "react-router-dom";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [pdf, setPDF] = useState(null);
  const params = useParams();
  const bookedId = params.id;
  // const pdf = BillReceipt ("644b0e51f2857264bad11034")
  useEffect(() => {
    callAPI(`${import.meta.env.VITE__API_URL}/orders/getOrder/${bookedId}`, "GET", "", user.token).then((res) => {
      const pdf = BillReceipt({ order: res }, { items: res.items });
      setPDF(pdf);
    });
  }, []);
  if (pdf == null) return null;
  return <PDFViewer style={{ width: "100%", height: "100vh", margin: 0, padding: 0, border: "none" }}>{pdf}</PDFViewer>;
};

export default App;
