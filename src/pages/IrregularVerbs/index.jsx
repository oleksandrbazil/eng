import React, {useState, useEffect} from "react";
import {makeStyles} from '@material-ui/core/styles';
// components
import Page from "../../components/Page";
import {irregularVerbs} from "../../data";
// ui components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
    helper: {
        marginBottom: theme.spacing(3),
    },
    column: {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
    },
    t: {
        color: 'gray'
    }
}));

const VerbsTable = ({verbs = [], showTranscription}) => {
    const classes = useStyles();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.column}>#</TableCell>
                    <TableCell className={classes.column}>Form 1</TableCell>
                    <TableCell className={classes.column}>Form 2</TableCell>
                    <TableCell className={classes.column}>Form 3</TableCell>
                    <TableCell className={classes.column}>Meaning</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {verbs.map(
                    ({v1, t1, v2, t2, v3, t3, meaning}, index) => (
                        <TableRow key={v1} hover>
                            <TableCell>{index + 1}</TableCell>
                            <TranscriptionCell
                                verb={v1}
                                transcription={t1}
                                showTranscription={showTranscription}/>
                            <TranscriptionCell
                                verb={v2}
                                transcription={t2}
                                showTranscription={showTranscription}/>
                            <TranscriptionCell
                                verb={v3}
                                transcription={t3}
                                showTranscription={showTranscription}/>
                            <TableCell>{meaning}</TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table>
    );
};

const TranscriptionCell = ({verb = '', transcription = '', showTranscription}) => {
    const classes = useStyles();
    return (
        <TableCell>
            <span>{verb}</span>
            {showTranscription && <span className={classes.t}> {transcription}</span>}
        </TableCell>
    );
};


const IrregularVerbs = () => {
    const classes = useStyles();
    const [verbs, setVerbs] = useState(irregularVerbs);
    const [searchBy, setSearchBy] = useState('');
    const [withExtended, setWithExtended] = useState(false);
    const [showTranscription, setShowTranscription] = useState(true);

    useEffect(() => {
        let words = irregularVerbs;
        if (!withExtended) {
            words = words.filter(({extended}) => !extended);
        }
        if (searchBy) {
            words = words.filter(({v1, v2, v3, meaning}) => (
                v1.includes(searchBy) || v2.includes(searchBy) || v3.includes(searchBy) || meaning.includes(searchBy)
            ));
        }
        setVerbs(words)
    }, [withExtended, searchBy]);

    const searchChangeHandler = ({target: {value} = {value: ''}}) => {
        setSearchBy(value)
    };

    return (
        <Page title="Irregular Verbs">
            <Grid container alignItems="center" justifyContent="center">
                <Card className={classes.helper}>
                    <CardContent>
                        <FormControl fullWidth>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={withExtended}
                                        onChange={() => setWithExtended(!withExtended)}
                                        value="extended"
                                        color="primary"
                                    />
                                }
                                label="With Extended"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={showTranscription}
                                        onChange={() => setShowTranscription(!showTranscription)}
                                        value="extended"
                                        color="primary"
                                    />
                                }
                                label="Show Transcription"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="search">search</InputLabel>
                            <Input id="search" type="search" onChange={searchChangeHandler}/>
                        </FormControl>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container alignItems="center" justifyContent="center" spacing={1}>
                <Grid item>
                    <Paper>
                        <VerbsTable verbs={verbs} showTranscription/>
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    );
};

export default IrregularVerbs
