import React from "react";
import { Route, useParams } from "react-router-dom";
import styled from "styled-components";

const CollectionDetail = props => {
  let name = "C1";
  let date = "1/1/2019";

  return (
    <>
      <h1>{name}</h1>
      <p>{date}</p>
    </>
  );
};

export default CollectionDetail;
