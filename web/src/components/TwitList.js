import React, { Fragment, useCallback, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";
import { Twit } from "./Twit";
import { DEFAULT_MODEL } from "../persistence/model_settings";

function load_twits(page) {
  return fetch(`/api/twits?page=${page}`).then((res) => res.json());
}

function filter(twits, setting) {
  const { model, thr } = setting;
  if (model === DEFAULT_MODEL) {
    return twits;
  }
  console.log("filter by ", model, thr);
  return Array.from(twits).filter((t) => {
    const model_not_exists = !(model in t["model_results"]);
    const thr_le_score =
      thr !== null &&
      model in t["model_results"] &&
      t["model_results"][model]["score"] <= thr;
    const thr_null_but_positive =
      thr === null &&
      model in t["model_results"] &&
      !t["model_results"][model]["is_negative"];
    return model_not_exists || thr_le_score || thr_null_but_positive;
  });
}

export function TwitList({ modelSetting }) {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inited, setInited] = useState(false);
  const handleChange = useCallback(
    (event, page) => {
      setLoading(true);
      return load_twits(page).then(({ twits, page, page_size, total }) => {
        setItems(twits);
        setPage(page);
        setTotalPages(Math.floor(total / page_size));
        setLoading(false);
      });
    },
    [page]
  );
  useEffect(() => {
    handleChange(null, 0).then(() => setInited(true));
  }, [inited]);
  return (
    <Fragment>
      {loading && <CircularProgress />}
      {!loading && inited && filter(items, modelSetting).map(Twit)}
      {inited && (
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      )}
    </Fragment>
  );
}
