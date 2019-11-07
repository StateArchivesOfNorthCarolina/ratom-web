import React from "react";
import { Route, useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";

const CollectionMessages = props => {
  let { collectionId } = useParams();

  return (
    <>
      <h3>Requested Collection ID: {collectionId}</h3>
      <CollectionDetail />
    </>
  );
};

export default CollectionMessages;
