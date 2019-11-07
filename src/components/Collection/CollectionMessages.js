import React, { useContext, createContext, useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import AppContext from "../app-state";

const CollectionMessages = props => {
  const { collectionId } = useParams();
  const { currentCollection, setCurrentCollection, collections } = useContext(
    AppContext
  );

  useEffect(() => {
    collections.forEach(element => {
      if (element.collectionId == collectionId) setCurrentCollection(element);
    });
  }, [collectionId]);

  function noCollection() {
    return "No collection selected";
  }

  return (
    <>
      {currentCollection ? <CollectionDetail /> : noCollection()}
      {/* <MessageList collectionId={collectionId} /> */}
    </>
  );
};

export default CollectionMessages;
