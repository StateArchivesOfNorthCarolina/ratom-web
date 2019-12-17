import React from "react";

// Router
import PrivateRoute from "../PrivateRoute";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

// Children
import MessagesLayout from "./MessagesLayout";
import MessageLayout from "../Message/MessageLayout";
import GenericNotFound from "../GenericNotFound";

const MessagesMain = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <PrivateRoute exact path={path}>
          <MessagesLayout />
        </PrivateRoute>
        <PrivateRoute path={`${path}/messages/:messageId`}>
          <MessageLayout />
        </PrivateRoute>
        <Route path="/404">
          <GenericNotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default MessagesMain;
