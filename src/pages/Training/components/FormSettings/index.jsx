import React from 'react';
import {Formik, Form} from "formik";
// ui components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import OutlinedInput from '../../../../components/OutlinedInput'


const FormSettings = ({settings, handleSubmit, setSettings, maxNumberOfCards = 0}) => {
    return (
        <Formik
            initialValues={settings}
            validate={(values) => {
                const errors = {};
                const count = values.numberOfCards;
                if (!count) {
                    errors.numberOfCards = 'is required'
                } else if (count && typeof count === "string" && !count.match(/^[0-9]*$/)) {
                    errors.numberOfCards = 'accept only numbers'
                } else if (count && count <= 0) {
                    errors.numberOfCards = `minimum number is 1`
                } else if (count && count > maxNumberOfCards) {
                    errors.numberOfCards = `maximum number is ${maxNumberOfCards}`
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
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Setup settings
                            </Typography>
                            <FormControl fullWidth>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.withExtended}
                                            onChange={({target: {checked: withExtended}}) => {
                                                setSettings({...settings, withExtended})
                                            }}
                                            value="withExtended"
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
                                            checked={settings.oneAttempt}
                                            onChange={({target: {checked: oneAttempt}}) => {
                                                setSettings({...settings, oneAttempt})
                                            }}
                                            value="oneAttempt"
                                            color="primary"
                                        />
                                    }
                                    label="One Attempt"
                                />
                            </FormControl>
                            <OutlinedInput errors={errors} touched={touched} name="numberOfCards"
                                           label="Number of Cards"
                                           fullWidth/>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" type="submit">start</Button>
                        </CardActions>
                    </Card>


                </Form>
            )}
        </Formik>

    );
};

export default FormSettings;