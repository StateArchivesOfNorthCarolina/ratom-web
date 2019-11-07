import React, { useContext, createContext } from "react";
import { Route, useParams } from "react-router-dom";
import styled from "styled-components";
import CollectionContext from "./collection-state";

const CollectionDetail = props => {
  const { collectionId } = useContext(CollectionContext);

  return (
    <>
      <h3>Requested Collection ID: {collectionId}</h3>
      {/* <h1>{name}</h1>
      <p>{date}</p> */}
    </>
  );
};

export default CollectionDetail;
