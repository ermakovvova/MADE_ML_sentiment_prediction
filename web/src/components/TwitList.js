import React, {Fragment, useCallback, useEffect, useState} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";
import {Twit} from "./Twit";
import {DEFAULT_MODEL} from "../persistence/model_settings";
import makeStyles from "@material-ui/core/styles/makeStyles";

function load_twits(page) {
    return fetch(`/api/twits?page=${page}`).then((res) => res.json());
}

const useStyles = makeStyles((theme) => ({
    card: {
        padding: 2,
        margin: 5,
    },
    author: {},
    text: {},
    acc: {'flex-direction': 'column'},
    full: {flex: '0 0 100%'}
}));

function filter(twits, setting) {
    console.log('start filter ', setting);
    const {model, thr} = setting;
    if (model === DEFAULT_MODEL) {
        return twits;
    }
    return Array.from(twits).map((t) => {
        const model_not_exists = !(model in t['model_results']);
        const thr_le_score =
            thr !== null &&
            model in t['model_results'] &&
            t['model_results'][model]['score'] >= thr;
        const thr_null_but_positive =
            thr === null &&
            model in t['model_results'] &&
            !t['model_results'][model]['is_negative'];
        t['model_results']['show'] = model_not_exists || thr_le_score || thr_null_but_positive;
        return {...t};
    });
}

export function TwitList({modelSetting}) {
    const classes = useStyles();

    const [page, setPage] = useState(0);
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [inited, setInited] = useState(false);
    const handleChange = useCallback(
        (event, page) => {
            setLoading(true);
            return load_twits(page).then(({twits, page, page_size, total}) => {
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
            {loading && <CircularProgress/>}
            {!loading && inited && filter(items, modelSetting).map(twit => <Twit twit_res={twit} classes={classes}
                                                                                 key={twit.twit.id}/>)}
            {inited && (
                <Pagination count={totalPages} page={page} onChange={handleChange}/>
            )}
        </Fragment>
    );
}
