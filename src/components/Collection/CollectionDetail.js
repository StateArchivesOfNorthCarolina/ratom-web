import React, { useContext } from "react";
import AppContext from "../app-state";

const CollectionDetail = props => {
  const { currentCollection } = useContext(AppContext);

  return (
    <>
      <h3>Requested Collection ID: {currentCollection.id}</h3>
      <h1>{currentCollection.title}</h1>
      <p>{currentCollection.accessionDate}</p>
    </>
  );
};

export default CollectionDetail;
