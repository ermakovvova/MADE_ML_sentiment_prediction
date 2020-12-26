import Grid from "@material-ui/core/Grid";
import { TwitList } from "./TwitList";
import { ModelSettings } from "./ModelSettings";
import React, { Fragment, useState } from "react";
import {
  DEFAULT_MODEL,
  useModel,
  useThreshold,
} from "../persistence/model_settings";

export function TwitComponent() {
  const [persistedModel, setPersistedModel] = useModel(DEFAULT_MODEL);
  const [persistedThr, setPersistedThr] = useThreshold(null);

  const [modelSetting, setModelSetting] = useState({
    model: persistedModel,
    thr: persistedThr,
  });
  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <TwitList modelSetting={modelSetting} />
        </Grid>
        <Grid item xs={2}>
          <ModelSettings
            onChangeModelSettings={(model, thr) => {
              console.log("change", model, thr);
              setModelSetting({ model, thr });
            }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}
