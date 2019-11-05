const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.province = !isEmpty(data.province) ? data.province : '';
  data.district = !isEmpty(data.district) ? data.district : '';
  data.ward = !isEmpty(data.ward) ? data.ward : '';
  data.details = !isEmpty(data.details) ? data.details : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (Validator.isEmpty(data.province)) {
    errors.province = 'Tỉnh không được bỏ trống';
  }
  if (Validator.isEmpty(data.district)) {
    errors.district = 'Quận huyện không được bỏ trống';
  }
  if (Validator.isEmpty(data.ward)) {
    errors.ward = 'Xã Phường không được bỏ trống';
  }
  if (Validator.isEmpty(data.details)) {
    errors.details = 'Địa chỉ cụ thể không được bỏ trống';
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Số điện thoại không được bỏ trống';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
