/** @format */

import React from 'react';
import { render } from 'react-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import './index.css';
export function App() {
  const getRegions = (country) => {
    return new Promise((resolve, reject) => {
      switch (country) {
        case 'usa':
          resolve([
            { value: 'Washington', label: 'Washington' },
            { value: 'California', label: 'California' },
            { value: 'LA', label: 'LA' },
          ]);
          break;
        case 'canada':
          resolve([
            { value: 'alberta', label: 'alberta' },
            { value: 'NovaScotia', label: 'NovaScotia' },
          ]);
          break;
        case 'iran':
          resolve([
            { value: 'tehran', label: 'tehran' },
            { value: 'qazvin', label: 'qazvin' },
            { value: 'karaj', label: 'karaj' },
          ]);
          break;
        default:
          resolve([]);
      }
    });
  };

  return (
    <div dir='rtl' className='app'>
      <Formik
        initialValues={{ country: 'None', region: 'None', regions: [] }}
        onSubmit={async () => {}}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Required'),
        })}>
        {(props) => {
          const {
            values,
            dirty,
            isSubmitting,
            handleChange,
            handleSubmit,
            handleReset,
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <label htmlFor='country'>کشور</label>
              <Field
                className='input'
                id='country'
                name='country'
                as='select'
                value={values.country}
                onChange={async (e) => {
                  const { value } = e.target;
                  const _regions = await getRegions(value);
                  console.log(_regions);
                  setFieldValue('country', value);
                  setFieldValue('region', '');
                  setFieldValue('regions', _regions);
                }}>
                <option value='canada'>canada</option>
                <option value='usa'>United States</option>
                <option value='iran'>iran</option>
              </Field>
              <label htmlFor='region'>استان</label>
              <Field
                className='input'
                value={values.region}
                id='region'
                name='region'
                as='select'
                onChange={handleChange}>
                <option value='None'>شهرها</option>
                {values.regions &&
                  values.regions.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
              </Field>

              <button
                type='button'
                className='outline'
                onClick={handleReset}
                disabled={!dirty || isSubmitting}>
                Reset
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
