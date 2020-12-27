import React, {Fragment, useCallback, useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export function Twit({twit_res, classes}) {
    const {twit, model_results} = twit_res;
    const [expanded, setExpanded] = useState(false);
    useEffect(() => setExpanded(model_results['show']), [model_results['show']]);
    const handleChange = useCallback((event, isExpanded) => {
        setExpanded(isExpanded);
    }, [model_results['show']]);

    return (<Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography className={classes.heading}>{twit["author"]}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography>
                {twit["text"]}
            </Typography>
        </AccordionDetails>
    </Accordion>);
}

// export function Twit({twit_res, classes}) {
//     const {twit, model_results} = twit_res;
//     return (
//         <Card className={classes.card}>
//             <CardContent>
//                 <Typography className={classes.author}>{twit["author"]}</Typography>
//                 <Typography className={classes.text}>{twit["text"]}</Typography>
//             </CardContent>
//         </Card>
//     );
// }
