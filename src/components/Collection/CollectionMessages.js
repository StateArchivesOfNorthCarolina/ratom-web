import React, { useContext, createContext } from "react";
import { Route, useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import CollectionContext from "./collection-state";

const CollectionMessages = props => {
  const { collectionId } = useParams();

  return (
    <>
      <CollectionContext.Provider value={{ collectionId }}>
        <CollectionDetail />
      </CollectionContext.Provider>
      {/* <MessageList collectionId={collectionId} /> */}
    </>
  );
};

export default CollectionMessages;
