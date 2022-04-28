import React from "react";
import { useState } from "react";

import "./form.scss";

function Form({ handleApiCall }) {
  const [data, setData] = useState("");
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      data: data,
    };
    handleApiCall(formData);
  };

  const handleMethod = (e) => {
    let { id } = e.target;
    setMethod(id.toUpperCase());
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "url") setUrl(value);
    if (name === "body") setData(value);
  };

  return (
    <>
      <form id="form" onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            placeholder="http://randomAPI.org/api/"
            id="urlInput"
            data-testid="urlInput"
            onChange={handleChange}
            name="url"
            type="text"
          />
          <button id="submitButton" data-testid="submitButton" type="submit">
            GO!
          </button>
        </label>
        <label className="methods">
          <span id="get" value="GET" onClick={handleMethod}>
            GET
          </span>
          <span id="post" value="POST" onClick={handleMethod}>
            POST
          </span>
          <span id="put" value="PUT" onClick={handleMethod}>
            PUT
          </span>
          <span id="delete" value="DELETE" onClick={handleMethod}>
            DELETE
          </span>
        </label>
        {method === "POST" || method === "PUT"}
        <>
          <textarea
            placeholder="JSON BODY"
            id="textArea"
            name="body"
            onChange={handleChange}
          />
        </>
      </form>
    </>
  );
}

export default Form;
