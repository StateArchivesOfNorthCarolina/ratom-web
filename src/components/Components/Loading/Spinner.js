import React from "react";
import { withTheme } from "styled-components";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = props => {
  const height = props.large ? 75 : 25;
  const width = height;

  let color = props.theme.colorPrimary;
  if (props.positive) {
    color = props.theme.textColorLight;
  }
  if (props.neutral) {
    color = props.theme.colorPrimary;
  }
  if (props.negative) {
    color = props.theme.textColorLight;
  }

  return <Loader type="Watch" color={color} height={height} width={width} />;
};

export default withTheme(Spinner);
