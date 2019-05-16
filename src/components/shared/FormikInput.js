import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const FormikInput = ({ field, ...props }) => <Input {...field} {...props} />;

FormikInput.propTypes = {
  field: PropTypes.object
};

export default FormikInput;
