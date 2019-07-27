import React, {useState, useEffect} from "react";
//components
import Page from "../../components/Page";
import CheckVerbForm from "./components/CheckVerbForm";
import FormSettings from './components/FormSettings'
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

    const start = () => {
        setCards(getRandom(words, numberOfCards));
        setStep(0);
        setStatus(PROGRESS);
    };

    const finish = () => {
        setStatus(FINISH);
    };

    const next = () => {
        if (step >= numberOfCards) {
            setStatus(FINISH);
        } else {
            setStep(step + 1)
        }
    };


    const StartBlock = (
        <div>
            <h6>Setup settings</h6>
            <FormSettings
                settings={settings}
                maxNumberOfCards={words.length}
                setSettings={(newSettings) => {
                    setSettings(newSettings)
                }}
                handleSubmit={(values) => {
                    setSettings(values);
                    start();
                }}/>
        </div>
    );

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
        <div>
            <h6>Your results:</h6>
            <div>
                <button onClick={() => {
                    setStatus(START);
                }}>Repeat
                </button>
            </div>
            <div>
                <button onClick={() => {
                    setStatus(START);
                    setSettings(defaultSettings);
                }}>Go to Settings
                </button>
            </div>
        </div>
    );

    return (
        <Page title="Training">
            <div>
                {status === START && StartBlock}
                {status === PROGRESS && ProgressBlock}
                {status === FINISH && FinishBlock}
            </div>
        </Page>
    );
};
