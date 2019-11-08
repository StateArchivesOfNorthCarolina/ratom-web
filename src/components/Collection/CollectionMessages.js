import React, { useContext, useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import AppContext from "../app-state";
import MessageList from "../Message/MessageList";

export const CollectionContext = createContext(null);

const CollectionMessages = props => {
  const { collectionId } = useParams();
  const [currentCollectionId, setCurrentCollectionId] = useState();
  const { currentCollection, setCurrentCollection, collections } = useContext(
    AppContext
  );

  useEffect(() => {
    setCurrentCollectionId(collectionId);
  }, [setCurrentCollectionId, collectionId]);

  useEffect(() => {
    collections.forEach(collection => {
      if (collection.id === currentCollectionId)
        setCurrentCollection(collection);
    });
  }, [currentCollectionId, collections, setCurrentCollection]);

  function noCollection() {
    return "No collection selected";
  }

  return (
    <CollectionContext.Provider>
      {currentCollection ? <CollectionDetail /> : noCollection()}
      <MessageList />
    </CollectionContext.Provider>
  );
};

export default CollectionMessages;
