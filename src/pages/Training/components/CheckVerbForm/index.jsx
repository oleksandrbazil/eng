import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";

const defaultMessage = 'use only alphabet of english';

Yup.addMethod(Yup.string, "isEnglish", function (args) {
    const {message} = args;
    return Yup.mixed().test(`isEnglish`, message, function (value) {
        const {path, createError} = this;
        const {message = defaultMessage} = args;
        return value ? value.match(/^[A-Za-z]*$/) || createError({path, message}) : true;
    })
});

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
                    {meaning}
                    <div>
                        {attempt.message}
                    </div>
                    {fields.map((name, index) => (
                        <div key={name}
                             className={(errors[name] && touched[name]) || attempt.errors[name] ? 'error' : ''}>
                            <label htmlFor={name}>
                                V<sub>{index + 1}</sub>
                            </label>
                            <Field id={name} name={name}/>
                            <ErrorMessage name={name} component="div"/>
                        </div>
                    ))}
                    <button type="submit">Next</button>
                    <button type="text" onClick={stop}>Stop Training</button>
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
