import React, { useContext, createContext, useEffect, useState } from "react";
import { Route, useParams } from "react-router-dom";
import CollectionDetail from "./CollectionDetail";
import { Link } from "react-router-dom";
import sendOperation from "../../graphql/sendOperation";
import AppContext from "../app-state";

const CollectionList = props => {
  const { collections, setCollections } = useContext(AppContext);

  useEffect(() => {
    sendOperation("")
      .then(response => {
        setCollections(response.data);
      })
      .catch(err => {});
  }, []);

  return (
    <>
      <h2>Collections</h2>
      {collections.map(collection => (
        <nav>
          <Link to={`/collection/${collection.collectionId}`}>
            {collection.name}
          </Link>
        </nav>
      ))}
    </>
  );
};

export default CollectionList;
