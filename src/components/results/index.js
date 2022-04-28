import React from "react";
import ReactJson from "react-json-view";
import { useEffect } from "react";

function Results(props) {
  useEffect(() => {
    console.log("loading before...");
  }, [props.data]);

  useEffect(() => {
    return () => console.log("loading after...");
  });
  
  return (
    <section>
      <pre>{props.data ? <ReactJson src={props.data} theme="solarized"/> : null}</pre>
    </section>
  );
}

export default Results;
