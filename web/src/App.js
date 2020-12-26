import "./App.css";
import React, { Fragment } from "react";
import Container from "@material-ui/core/Container";
import { TwitComponent } from "./components/TwitComponent";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <TwitComponent />
      </Container>
    </Fragment>
  );
}

export default App;
