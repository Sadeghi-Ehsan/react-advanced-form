# `Form.onInvalid`

## Specification
Called once the submit is prevented due to invalid validation state of the form. Useful for any kind of custom logic based on the invalid fields.

### Arguments

| Property name | Type | Description |
| ------------- | ---- | ----------- |
| `invalidFields` | `Array<Object>` | Unordered list of invalid fields. |
| `fields` | `Object` | Map of all fields. |
| `form` | `Object` | A reference to the current `Form` |

## Usage
```jsx
import React from 'react';
import { Form } from 'react-advanced-form';
import { Input } from 'react-advanced-form-addons';

export default class MyForm extends React.Component {
    handleInvalidForm = ({ invalidFields, fields, form }) => {
        // ...
    }

    render() {
        return (
            <Form onInvalid={ this.handleInvalidForm }>
                <Input name="username" required />
                <button type="submit">Submit</button>
            </Form>
        );
    }
}
```