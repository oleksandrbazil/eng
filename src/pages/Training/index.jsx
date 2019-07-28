import React, {useState, useEffect} from "react";
//components
import Page from "../../components/Page";
import CheckVerbForm from "./components/CheckVerbForm";
import FormSettings from './components/FormSettings'
// ui components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

// others
import {irregularVerbs} from "../../data";
import {getRandom} from "./helpers";


const defaultSettings = {
    withExtended: true,
    oneAttempt: false,
    numberOfCards: 10,
};

// statuses
const START = 'start';
const PROGRESS = 'progress';
const FINISH = 'finish';

export default () => {
    const [status, setStatus] = useState(START);
    const [settings, setSettings] = useState(defaultSettings);
    const [cards, setCards] = useState([]);
    const [words, setWords] = useState(irregularVerbs);
    const [step, setStep] = useState(0);

    const {withExtended, numberOfCards} = settings;

    useEffect(() => {
        setWords(withExtended ? irregularVerbs : irregularVerbs.filter(({extended}) => !extended))
    }, [withExtended]);

    const start = (numberOfCards) => {
        setCards(getRandom(words, numberOfCards));
        setStep(0);
        setStatus(PROGRESS);
    };

    const finish = () => {
        setStatus(FINISH);
    };

    const next = () => {
        const nextStep = step + 1;
        setStep(nextStep);
        if (nextStep === numberOfCards) {
            setStatus(FINISH);
        }
    };

    const ProgressBlock = (
        <div>
            <h6>{step + 1}/{numberOfCards}</h6>
            <CheckVerbForm
                handleOnSubmit={() => {
                    next()
                }}
                word={cards[step]}
                stop={finish}/>
        </div>
    );

    const FinishBlock = (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Your results
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl>
                    <ButtonGroup variant="contained" color="primary">
                        <Button
                            onClick={() => {
                                setStatus(START);
                            }}>Repeat
                        </Button>
                        <Button
                            onClick={() => {
                                setStatus(START);
                                setSettings(defaultSettings);
                            }}>Go to Settings
                        </Button>
                    </ButtonGroup>
                </FormControl>
            </CardActions>

        </Card>
    );

    return (
        <Page title="Training">
            <Grid container justify="center" alignItems="center">
                {status === START && <FormSettings
                    settings={settings}
                    maxNumberOfCards={words.length}
                    setSettings={(newSettings) => {
                        setSettings(newSettings)
                    }}
                    handleSubmit={(values) => {
                        setSettings(values);
                        start(values.numberOfCards);

                    }}/>}
                {status === PROGRESS && ProgressBlock}
                {status === FINISH && FinishBlock}
            </Grid>
        </Page>
    );
};
