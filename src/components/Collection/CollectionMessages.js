import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import AppContext from "../app-state";

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
    <>
      {currentCollection ? <CollectionDetail /> : noCollection()}
      {/* <MessageList collectionId={collectionId} /> */}
    </>
  );
};

export default CollectionMessages;
