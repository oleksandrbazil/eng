import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";


const FormSettings = ({settings, handleSubmit, setSettings, maxNumberOfCards = 0}) => {
    return (
        <Formik
            initialValues={settings}
            validate={(values) => {
                const errors = {};
                const count = values.numberOfCards;
                if (count && !count.match(/^[0-9]*$/)) {
                    errors.numberOfCards = 'Please, enter only numbers'
                } else if (count && count <= 0) {
                    errors.numberOfCards = `Too few cards, minimum 1 card`
                } else if (count && count > maxNumberOfCards) {
                    errors.numberOfCards = `Too many cards, maximum number of cards is ${maxNumberOfCards}`
                }
                return errors
            }}
            onSubmit={(values) => {
                values.numberOfCards = Number(values.numberOfCards);
                handleSubmit(values)
            }}
        >
            {({errors, touched}) => (
                <Form>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor="withExtended">With Extended</label></td>
                            <td>
                                <input id="withExtended" type="checkbox"
                                       onChange={({target: {checked: withExtended}}) => {
                                           setSettings({...settings, withExtended})
                                       }}
                                       checked={settings.withExtended}/>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="oneAttempt">One Attempt</label></td>
                            <td>
                                <input id="oneAttempt" type="checkbox"
                                       onChange={({target: {checked: oneAttempt}}) => {
                                           setSettings({...settings, oneAttempt})
                                       }}
                                       checked={settings.oneAttempt}/>
                            </td>
                        </tr>
                        <tr className={errors.numberOfCards && touched.numberOfCards ? 'error' : ''}>
                            <td><label htmlFor="numberOfCards">Number of Cards</label></td>
                            <td>
                                <Field id="numberOfCards" type="text" name="numberOfCards"/>
                                <ErrorMessage name="numberOfCards" component="div"/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">start</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Form>
            )}
        </Formik>

    );
};

export default FormSettings;