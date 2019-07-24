import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  form1: Yup.string().required(),
  form2: Yup.string().required(),
  form3: Yup.string().required()
});

const initValues = {
  form1: "",
  form2: "",
  form3: ""
};

const fields = Object.keys(initValues);

export default () => {
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      <Form>
        {fields.map((name, index) => (
          <div key={name}>
            <label htmlFor={name}>
              V<sub>{index + 1}</sub>
            </label>
            <Field id={name} name={name} />
            <ErrorMessage name={name} component="div" />
          </div>
        ))}
        <button type="submit">check</button>
      </Form>
    </Formik>
  );
};
