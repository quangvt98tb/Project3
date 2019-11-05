/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Vui lòng nhập email';
  };

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Vui lòng nhập mật khẩu';
  };
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
