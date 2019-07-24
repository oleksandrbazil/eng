import React, { useState, useEffect } from "react";
// components
import Page from "../../components/Page";
import { irregularVerbs } from "../../data";

export default () => {
  const [verbs, setVerbs] = useState(irregularVerbs);
  const [showExtended, setShowExtended] = useState(false);
  const [showTranscription, setShowTranscription] = useState(true);

  useEffect(
    () => {
      setVerbs(
        showExtended ? irregularVerbs : irregularVerbs.filter(i => !i.extended)
      );
    },
    [showExtended]
  );

  return (
    <Page title="Irregular Verbs">
      <button onClick={() => setShowExtended(!showExtended)}>
        {showExtended ? "Hide Extended" : "Show Extended"}
      </button>
      <button onClick={() => setShowTranscription(!showTranscription)}>
        {showTranscription ? "Hide Transcription" : "Show Transcription"}
      </button>
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
            ({ id, group, v1, t1, v2, t2, v3, t3, meaning }, index) => (
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
