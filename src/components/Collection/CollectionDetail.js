import React, { useContext } from "react";
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
