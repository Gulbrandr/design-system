import type { Meta, Story } from '@storybook/react';
import ComboBox from '../ComboBox';
import { Form, Formik } from 'formik';
import ReactJson from 'react-json-view';

const meta: Meta = {
  title: 'Input/ComboBox',
  component: ComboBox,
};

export default meta;

const Template: Story<Meta> = (args) => {
  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={{
          favoriteAnimal: '', // This is the field name
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <div className="flex w-full gap-8">
            <Form>
              <ComboBox
                placeholder="Select your favorite animal"
                name="favoriteAnimal"
                selectKey={'displayName'}
                options={
                  [
                    { displayName: 'Cats', id: 1 },
                    { displayName: 'Cat', id: 2 },
                    { displayName: 'Doggos', id: 3 },
                    ,
                    { displayName: 'Dogs', id: 4 },
                    ,
                    { displayName: 'Dog', id: 5 },
                    ,
                    { displayName: 'Birds', id: 6 },
                  ] as { displayName: string; id: number }[]
                } // This is a hack to get around the fact that Storybook doesn't support generics
              />
            </Form>
            <div className="shadow bg-white p-2 border flex flex-col">
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
