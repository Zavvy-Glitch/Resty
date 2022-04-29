import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./app.scss";


import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

function App() {
  const [data, setData] = useState({});
  const [requestParams, setRequestParams] = useState({});
 
  useEffect(() => {
    if(requestParams.url) {
      try {
        async function fetchData() {
          let apiUrl = requestParams.url;
          const response = await axios(apiUrl);
          const resultData = {
            Headers: response.headers,
            count: response.data.count,
            Response: response
          };
          setData(resultData);
        }
        fetchData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [requestParams]);
  
  const callApi = (requestParams) => {
    setRequestParams(requestParams);
  };

  return (
    <React.Fragment>
      <Header />
      <div data-testid='reqDisplay'>Request Method: {requestParams.method}</div>
      <div data-testid="urlDisplay">URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {data ? <Results data={data} /> : <p id="loading">Loading...</p>}
      <Footer />
    </React.Fragment>
  );
}

export default App;
