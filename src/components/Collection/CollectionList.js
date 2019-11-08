import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ALL_COLLECTIONS = gql`
  {
    allCollections {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const CollectionList = props => {
  const { loading, error, data } = useQuery(ALL_COLLECTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h2>Collections</h2>
      {data.allCollections.edges.map(edge => (
        <nav key={edge.node.id}>
          <Link to={`/collection/${edge.node.id}`}>{edge.node.title}</Link>
        </nav>
      ))}
    </>
  );
};

export default CollectionList;
