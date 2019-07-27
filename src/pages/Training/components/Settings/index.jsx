import React from 'react';

const Index = ({settings, setSettings}) => {
    const {withExtended, numberOfCards} = settings;
    return (
        <table>
            <tbody>
            <tr>
                <td><label htmlFor="extended">with extended</label></td>
                <td>
                    <input id="extended" type="checkbox"
                           value={withExtended}
                           onChange={() => {
                               setSettings({...settings, withExtended: !withExtended})
                           }}/>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="numberOfCards">Number of cards</label></td>
                <td>
                    <input id="numberOfCards" type="text"
                           value={numberOfCards}
                           pattern="[0-9]*"
                           onChange={(event) => {
                               const {target: {value}} = event;
                               setSettings({...settings, numberOfCards: value.replace(/\D/, '')})
                           }}/>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default Index;