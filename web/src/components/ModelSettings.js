import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import FormHelperText from "@material-ui/core/FormHelperText";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {
  DEFAULT_MODEL,
  useModel,
  useThreshold,
} from "../persistence/model_settings";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

function fetchModels() {
  return fetch("/api/models").then((res) => res.json());
}

export function ModelSettings({ onChangeModelSettings }) {
  const classes = useStyles();

  const [models, setModels] = useState({});

  const [persistedModel, setPersistedModel] = useModel(DEFAULT_MODEL);
  const [persistedThreshold, setPersistedThreshold] = useThreshold(null);

  const [chosenModel, setChosenModel] = useState(persistedModel);
  const [chosenThreshold, setChosenThreshold] = useState(persistedThreshold);

  const handlePersist = useCallback(
    (_) => {
      setPersistedModel(
        chosenModel !== undefined ? chosenModel : DEFAULT_MODEL
      );
      setPersistedThreshold(
        chosenThreshold !== undefined ? chosenThreshold : null
      );
    },
    [chosenModel, chosenThreshold, setPersistedModel, setPersistedThreshold]
  );

  useEffect(() => {
    fetchModels().then((res) => {
      setModels(res);
      if (chosenModel === DEFAULT_MODEL) {
        const new_model = Object.keys(res)[0];
        setChosenModel(new_model);
        setChosenThreshold(res[new_model]);
        onChangeModelSettings(new_model, res[new_model]);
      }
    });
  }, [chosenModel]);
  const handleModelChange = useCallback(
    (event) => {
      const new_model = event.target.value;
      setChosenModel(new_model);
      setChosenThreshold(models[new_model]);
      onChangeModelSettings(new_model, models[new_model]);
    },
    [models, onChangeModelSettings]
  );
  const handleThresholdChange = useCallback(
    (_, val) => {
      setChosenThreshold(val);
    },
    [chosenModel, onChangeModelSettings]
  );
  const commitThresholdChange = useCallback(
      (_, val) => {
          console.log('commit');
          setChosenThreshold(val);
          onChangeModelSettings(chosenModel, val);
      },
      [chosenModel, onChangeModelSettings]
  );
  const loaded = Object.keys(models).length > 0;
  return (
    <Fragment>
      {loaded && (
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Модель</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            value={chosenModel}
            onChange={handleModelChange}
          >
            {Object.entries(models).map(([name, default_thr]) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {loaded && models[chosenModel] !== null && (
        <FormControl className={classes.formControl}>
          <Slider
            value={chosenThreshold}
            aria-labelledby="discrete-slider-small-steps"
            step={0.05}
            marks
            min={0.0}
            max={1.0}
            valueLabelDisplay="auto"
            onChange={handleThresholdChange}
            onChangeCommitted={commitThresholdChange}
          />
          <FormHelperText>Выберите порог</FormHelperText>
        </FormControl>
      )}

      {loaded && (
        <FormControl>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            onClick={handlePersist}
            startIcon={<SaveIcon />}
          >
            Сохранить
          </Button>
        </FormControl>
      )}
    </Fragment>
  );
}
