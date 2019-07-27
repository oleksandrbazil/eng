import React, {useState} from "react";
//components
import Page from "../../components/Page";
import CheckVerbForm from "./components/CheckVerbForm";
import Settings from './components/Settings'
// others
import {irregularVerbs} from "../../data";
import {getRandom} from "./helpers";


const defaultSettings = {
    withExtended: false,
    oneAttempt: false,
    numberOfCards: 10,
};

export default () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [isTraining, setIsTraining] = useState(false);
    const [cards, setCards] = useState([]);
    const [step, setStep] = useState(0);

    const {withExtended, numberOfCards} = settings;

    const start = () => {
        const words = withExtended ? irregularVerbs : irregularVerbs.filter(({extended}) => !extended)
        const cards = getRandom(words, numberOfCards);
        setCards(cards);
        setStep(0);
        setIsTraining(true);
    };

    const stop = () => {
        setIsTraining(false);
    };


    const nextCard = () => {
        if (step >= numberOfCards) {
            setIsTraining(false);
        } else {
            setStep(step + 1)
        }
    };

    const StartBlock = (
        <div>
            <Settings setSettings={setSettings} settings={settings}/>
            <button onClick={() => {
                start()
            }}>start
            </button>
        </div>
    );

    const ProgressBlock = (
        <div>
            <span>{step}/{numberOfCards}</span>
            {isTraining && <CheckVerbForm
                handleOnSubmit={() => {
                    nextCard()
                }}
                word={cards[step]}
                stop={stop}/>}
        </div>
    );

    return (
        <Page title="Training">
            <div>
                {!isTraining && StartBlock}
                {isTraining && ProgressBlock}
            </div>
        </Page>
    );
};
