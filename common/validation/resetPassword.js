/* eslint-disable no-param-reassign */
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (pass1, pass2, passwOld) => {
  const errors = {};
  pass1 = !isEmpty(pass1) ? pass1 : '';
  pass2 = !isEmpty(pass2) ? pass2 : '';
  passwOld = !isEmpty(passwOld) ? passwOld : '';

  if (pass1 != pass2){
    errors.password2 = "Mật khẩu mới phải trùng nhau"
  }
  if (Validator.isEmpty(pass1)) {
    errors.password1 = 'Vui lòng nhập mật khẩu mới';
  };
  if (Validator.isEmpty(pass2)) {
    errors.password2 = 'Vui lòng nhập mật khẩu mới';
  };
  if (Validator.isEmpty(passwOld)) {
    errors.passwordOld = 'Vui lòng nhập mật khẩu cũ';
  };

  return {
    errors,
    isValid: isEmpty(errors)
  };
};