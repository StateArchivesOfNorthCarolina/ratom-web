import React, { useContext, createContext } from "react";
import { Route, useParams } from "react-router-dom";
import styled from "styled-components";
import AppContext from "../app-state";

const CollectionDetail = props => {
  const { currentCollection } = useContext(AppContext);

  return (
    <>
      <h3>Requested Collection ID: {currentCollection.collectionId}</h3>
      <h1>{currentCollection.name}</h1>
      <p>{currentCollection.date}</p>
    </>
  );
};

export default CollectionDetail;
