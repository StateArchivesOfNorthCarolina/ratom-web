import React from "react";
import styled from "styled-components";

// Router
import PrivateRoute from "../PrivateRoute";
import { Switch, useRouteMatch } from "react-router-dom";

// Children
import MessagesLayout from "./MessagesLayout";
import MessageLayout from "../Message/MessageLayout";


const MessagesMain = () => {
    const { path } = useRouteMatch();

    return (
      <MessagesMainStyled>
        <Switch>
          <PrivateRoute exact path={path}>
            <MessagesLayout />
          </PrivateRoute>
          <PrivateRoute path={`${path}/messages/:messageId`}>
            <MessageLayout />
          </PrivateRoute>
        </Switch>
      </MessagesMainStyled>
    );
};

const MessagesMainStyled = styled.div`
  width: 100%;
`;

export default MessagesMain;

