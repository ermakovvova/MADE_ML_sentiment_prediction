import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

export function Twit(twit_res) {
  const { twit, model_results } = twit_res;
  return (
    <Fragment key={twit.id}>
      <Card>
        <Typography>{twit["author"]}</Typography>
        <Typography>{twit["text"]}</Typography>
      </Card>
    </Fragment>
  );
}
