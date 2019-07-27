import React, {useState, useEffect} from "react";
// components
import Page from "../../components/Page";
import {irregularVerbs} from "../../data";

export default () => {
    const [verbs, setVerbs] = useState(irregularVerbs);
    const [searchBy, setSearchBy] = useState('');
    const [showExtended, setShowExtended] = useState(false);
    const [showTranscription, setShowTranscription] = useState(true);

    useEffect(() => {
        let words = irregularVerbs;
        if (showExtended) {
            words = words.filter(({extended}) => !extended);
        }
        if (searchBy) {
            words = words.filter(({v1, v2, v3, meaning}) => v1.includes(searchBy) || v2.includes(searchBy) || v3.includes(searchBy) || meaning.includes(searchBy));
        }
        setVerbs(words)
    }, [showExtended, searchBy]);

    return (
        <Page title="Irregular Verbs">
            <table>
                <tbody>
                <tr>
                    <td><label htmlFor="extended">extended</label></td>
                    <td>
                        <input id="extended" type="checkbox"
                               value={showExtended}
                               onChange={() => {
                                   setShowExtended(!showExtended)
                               }}/>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="transcription">transcription</label></td>
                    <td>
                        <input id="transcription" type="checkbox"
                               value={showTranscription}
                               onChange={() => {
                                   setShowTranscription(!showTranscription)
                               }}/>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="search">search</label></td>
                    <td>
                        <input id="search" type="text" onChange={(event) => {
                            const {target: {value} = {value: ''}} = event;
                            setSearchBy(value)
                        }}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Форма 1</th>
                    <th>Форма 2</th>
                    <th>Форма 3</th>
                    <th>Значение</th>
                </tr>
                </thead>
                <tbody>
                {verbs.map(
                    ({id, group, v1, t1, v2, t2, v3, t3, meaning}, index) => (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>
                                {v1} {showTranscription ? t1 : null}
                            </td>
                            <td>
                                {v2} {showTranscription ? t2 : null}
                            </td>
                            <td>
                                {v3} {showTranscription ? t3 : null}
                            </td>
                            <td>{meaning}</td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </Page>
    );
};
