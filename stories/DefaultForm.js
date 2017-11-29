import React, { Component } from 'react';
import { FormProvider, Form, Field } from '../src';
import MyInput from './templates/MyInput';
import MySelect from './templates/MySelect';

/* Form validation rules */
const formRules = {
  name: {
    firstName: value => /^\w+$/.test(value)
  }
};

const formMessages = {
  general: {
    missing: 'Please provide the required field',
    invalid: 'Please provide a proper value',
    async: {
      defaultResolver: ({ someProperty }) => {
        return someProperty;
      }
    }
  },
  name: {
    numbersOnly: {
      invalid: 'Only numbers are allowed!',
      async: {
        customResolver: ({ res }) => {
          if (res.statusCode === 'FAILURE') return 'Validation failed';
        }
      }
    },
    firstName: {
      invalid: 'A name must contain letters.'
    },
    username: {
      async: {
        customResolver: ({ res, payload, fieldProps, formProps }) => {
          return payload.statusCode;
        }
      }
    }
  }
};

/* Composite field example */
const FieldsComposition = () => (
  <div style={{ display: 'flex' }}>
    <MyInput name="address" value="Baker" />
    <MyInput name="street" value="12/c" />
  </div>
);

export default class DefaultForm extends Component {
  state = {
    value: 1,
    valueTwo: 2,
    valueThree: 3,
    disabled: false
  }

  controlValue = (event) => {
    event.preventDefault();
    this.setState(prevState => ({ valueTwo: prevState.valueTwo + 1 }));
  }

  handleFormAction = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
  }

  handleSubmitStart = ({ fields, serialized, formProps }) => {
    console.warn('handleSubmitStart');
    console.log('fields', fields.toJS());
    console.log('serialized', serialized);
    console.log('formProps', formProps);
  }

  handleSubmitEnd = ({ fields, serialized, formProps }) => {
    console.warn('handleSubmitEnd');
    console.log('fields', fields.toJS());
    console.log('serialized', serialized);
    console.log('formProps', formProps);
  }

  render() {
    const { value, valueTwo, valueThree, disabled } = this.state;

    return (
      <FormProvider
        rules={ formRules }
        messages={ formMessages }>
        <Form
          id="default-form-example"
          action={this.handleFormAction}
          onSubmitStart={this.handleSubmitStart}
          onSubmitEnd={this.handleSubmitEnd}>
          <div className="field-group">
            {/* Select */}
            {/* <label>
              Select example:
              <Field.Select name="choice">
                <option>Foo</option>
                <option>Two</option>
              </Field.Select>
            </label> */}

            {/* Input */}
            <label>
              Filed with client rule (optional):
              <Field.Input
                name="fieldOne"
                value={ value }
                disabled={ disabled }
                onChange={({ nextValue }) => this.setState({ value: nextValue })} />
            </label>

            <label>
              Filed with client rule (optional):
              <MyInput
                name="fieldTwo"
                rule={/^\d+$/}
                value={ valueTwo }
                onChange={({ nextValue }) => this.setState({ valueTwo: nextValue })} />
            </label>

            <label>
              Filed with client rule (optional):
              <MyInput
                name="fieldThree"
                rule={/^\d+$/}
                value={ valueThree }
                onChange={({ nextValue }) => this.setState({ valueThree: nextValue })} />
            </label>

            {/* <label>
              Field (required):
              <MyInput
                name="password"
                required />
            </label> */}
{/*
            <label>
              Async rule (optional)
              <MyInput
                name="asyncOptional"
                asyncRule={({ fieldProps }) => {
                  return fetch('http://demo9102997.mockable.io/validate/productId', {
                    method: 'POST',
                    body: JSON.stringify({
                      username: fieldProps.value
                    })
                  });
                }} />
            </label>

            <label>
              Async rule (mandatory)
              <MyInput
                name="asyncMandatory"
                asyncRule={({ fieldProps }) => {
                  return fetch('http://demo9102997.mockable.io/validate/productId', {
                    method: 'POST',
                    body: JSON.stringify({
                      username: fieldProps.value
                    })
                  })
                  .then(() => {
                    return { valid: false, someProperty: 'someValue' };
                  });
                }}
                value="ab123"
                required />
            </label> */}

            {/* <label>
              Field with resolvable prop (required)
              <MyInput
                name="resolvableField"
                value="Another value"
                rule={({ value }) => value === 'John'}
                required={({ fields }) => fields.address && !!fields.address.value} />
            </label> */}

            {/* <label>
              Composite field:
              <FieldsComposition />
            </label>

            <label>
              Billing address
              <Field.Group name="billingAddress">
                <MyInput name="firstName" value="John" required />
                <MyInput name="lastName" value="Maverick" required />
              </Field.Group>
            </label>

            <label>
              Delivery address
              <Field.Group name="deliveryAddress">
                <MyInput name="firstName" value="Katheline" required />
                <MyInput name="lastName" value="Stark" required />
              </Field.Group>
            </label> */}
          </div>

          <button onClick={ this.controlValue }>Set value</button>

          <button type="submit">Submit</button>
        </Form>
      </FormProvider>
    );
  }
}
