import React from "react";

// Router
import PrivateRoute from "../PrivateRoute";
import { Route, Redirect, useRouteMatch } from "react-router-dom";

// Components 
import AnimatedSwitch from "../../Components/Animated/AnimatedSwitch";

// Children
import MessagesLayout from "./MessagesLayout";
import MessageLayout from "../Message/MessageLayout";
import GenericNotFound from "../GenericNotFound";

const MessagesMain = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <AnimatedSwitch>
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
      </AnimatedSwitch>
    </>
  );
};

export default MessagesMain;
