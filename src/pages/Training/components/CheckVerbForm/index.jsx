import React, {useState} from "react";
// libs
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {makeStyles} from '@material-ui/core/styles';
// ui components
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import OutlinedInput from '../../../../components/OutlinedInput'

const defaultMessage = 'use only alphabet of english';

Yup.addMethod(Yup.string, "isEnglish", function (args) {
    const {message} = args;
    return Yup.mixed().test(`isEnglish`, message, function (value) {
        const {path, createError} = this;
        const {message = defaultMessage} = args;
        return value ? value.match(/^[A-Za-z]*$/) || createError({path, message}) : true;
    })
});

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    message: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const validationSchema = Yup.object().shape({
    v1: Yup.string().isEnglish('').required(),
    v2: Yup.string().isEnglish('').required(),
    v3: Yup.string().isEnglish('').required()
});

const initValues = {
    v1: "",
    v2: "",
    v3: "",
};

const initAttempt = {
    message: '',
    errors: {},
    success: {}
};

const fields = Object.keys(initValues);

const CheckVerbForm = ({word, handleOnSubmit, stop}) => {
    const {meaning} = word;
    const [attempt, setAttempt] = useState(initAttempt);
    const classes = useStyles();
    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={(values, {validateForm, setFieldError, setErrors, resetForm}) => {
                setAttempt(initAttempt);
                const newAttempt = Object.assign({}, initAttempt);
                const errorsAfterCheck = {};

                Object.keys(values).forEach(key => {
                    if (word[key] !== values[key]) {
                        errorsAfterCheck[key] = 'Wrong verb form';
                        newAttempt.errors[key] = true
                    } else {
                        newAttempt.success[key] = true
                    }
                });

                const newErrors = Object.keys(errorsAfterCheck).length > 0;

                newAttempt.message = newErrors ? "You`re wrong: please, check highlighted fields" : "You`re right!";
                setAttempt(newAttempt);
                if (newErrors) {
                    setErrors(errorsAfterCheck);
                } else {
                    setTimeout(() => {
                        setAttempt(initAttempt);
                        resetForm();
                        handleOnSubmit()
                    }, 800)
                }
            }}
        >
            {({errors, touched}) => (
                <Form>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="subtitle1" className={classes.message}
                                        error={attempt.errors}
                                        color="green">
                                {attempt.message}
                            </Typography>
                            <Typography gutterBottom variant="h4" component="h2" color="primary">
                                {meaning}
                            </Typography>
                            {fields.map((name, index) => (
                                <OutlinedInput key={name} errors={errors} touched={touched} name={name}
                                               label={`V${index + 1}`}
                                               className={classes.textField}/>
                            ))}
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="primary" type="submit">Next</Button>
                            <Button color="secondary" type="text" onClick={stop}>Stop Training</Button>
                        </CardActions>
                    </Card>
                </Form>
            )}

        </Formik>
    );
};

CheckVerbForm.defaultProps = {
    word: {
        meaning: ''
    },
    handleOnSubmit: () => {
    },
    stop: () => {
    }
};

export default CheckVerbForm;
