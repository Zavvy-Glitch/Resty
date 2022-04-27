import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

function App() {
  const [data, setData] = useState({});
  const [requestParams, setRequestParams] = useState({});
  const [urlParams, setUrlParams] = useState(null)

  const callApi = async (requestParams) => {
    setRequestParams(requestParams);
    console.log(requestParams);
  };
  
  useEffect(() => {
    if(urlParams) {
      try {
        async function fetchData() {
          let apiUrl = urlParams;
          const response = await axios.get(apiUrl);
          const data = {
            Headers: response.headers,
            count: response.data.count,
            Response: response
          };
          setData(data);
        }
        fetchData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [urlParams]);


  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} urlParams = {setUrlParams} />
      {data ? <Results data={data} /> : <p id="loading">Loading...</p>}
      <Footer />
    </React.Fragment>
  );
}

export default App;
