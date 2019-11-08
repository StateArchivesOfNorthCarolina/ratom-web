import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import sendOperation from "../../graphql/sendOperation";
import AppContext from "../app-state";

const CollectionList = props => {
  const { collections, setCollections } = useContext(AppContext);

  useEffect(() => {
    sendOperation("collections")
      .then(response => {
        setCollections(response.data);
      })
      .catch(err => {});
  }, [setCollections]);

  return (
    <>
      <h2>Collections</h2>
      {collections.map(collection => (
        <nav key={collection.collectionId}>
          <Link to={`/collection/${collection.collectionId}`}>
            {collection.name}
          </Link>
        </nav>
      ))}
    </>
  );
};

export default CollectionList;
