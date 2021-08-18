import React, {useState, useRef, useEffect} from 'react';
import {ErrorMessage, Field} from "formik";
// ui components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import {default as UIOutlinedInput} from '@material-ui/core/OutlinedInput';
import FormHelperText from "@material-ui/core/FormHelperText";

const OutlinedInput = ({errors, touched, name, label, fullWidth, className}) => {
    const labelRef = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(labelRef.current.offsetWidth)
    }, [labelRef]);
    return (
        <FormControl fullWidth={fullWidth}
                     variant="outlined"
                     error={errors[name] && touched[name]}
                     className={className}>
            <InputLabel htmlFor={name} ref={labelRef}>{label}</InputLabel>
            <Field id={name} name={name}>
                {({field}) => (<UIOutlinedInput {...field} labelWidth={labelWidth}/>)}
            </Field>

            <ErrorMessage name={name} component={FormHelperText}
                          error={errors.numberOfCards && touched.numberOfCards}/>
        </FormControl>
    );
};

export default OutlinedInput
