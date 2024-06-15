import type { Meta, Story } from '@storybook/react';
import ComboBox from '../ComboBox';
import { Form, Formik } from 'formik';
import ReactJson from 'react-json-view';
import { InputField } from '.';
import * as Yup from 'yup';

const meta: Meta = {
  title: 'Input/TextField',
  component: InputField,
};

const validationSchema = Yup.object({
  favoriteAnimal: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export default meta;

const Template: Story<Meta> = (args) => {
  return (
    <div className="flex flex-col ">
      <Formik
        initialValues={{
          favoriteAnimal: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <div className="flex justify-between w-full ">
            <Form className="flex gap-4">
              <InputField
                type="text"
                name="favoriteAnimal"
                autoComplete="off"
                label="Favorite Animal"
                placeholder="Enter your favorite animal"
                tooltipText="This is a tooltip"
                helperText="This is helper text"
              />
              <InputField
                type="password"
                name="password"
                autoComplete="off"
                label="Password"
                tooltipText="This is a tooltip"
                helperText="This is helper text"
                wStateIcon
              />
            </Form>
            <div className="flex flex-col p-2 bg-white border shadow">
              <p className="text-body-1-bolder">Form Values</p>
              <ReactJson
                src={{
                  values,
                  errors,
                  touched,
                  isValid,
                }}
              />
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  ...meta.args,
};
