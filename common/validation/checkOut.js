const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = data => {
  const errors = {};

  data.profileData.province = !isEmpty(data.profileData.province) ? data.profileData.province : '';
  data.profileData.district = !isEmpty(data.profileData.district) ? data.profileData.district : '';
  data.profileData.ward = !isEmpty(data.profileData.ward) ? data.profileData.ward : '';
  data.profileData.details = !isEmpty(data.profileData.details) ? data.profileData.details : '';
  data.profileData.phone = !isEmpty(data.profileData.phone) ? data.profileData.phone : '';
  data.profileData.fullName = !isEmpty(data.profileData.phone) ? data.profileData.fullName : '';

  if (Validator.isEmpty(data.profileData.province)) {
    errors.province = 'Tỉnh không được bỏ trống';
  }
  if (Validator.isEmpty(data.profileData.district)) {
    errors.district = 'Quận huyện không được bỏ trống';
  }
  if (Validator.isEmpty(data.profileData.ward)) {
    errors.ward = 'Xã Phường không được bỏ trống';
  }
  if (Validator.isEmpty(data.profileData.details)) {
    errors.details = 'Địa chỉ cụ thể không được bỏ trống';
  }
  if (Validator.isEmpty(data.profileData.phone)) {
    errors.phone = 'Số điện thoại không được bỏ trống';
  }
  if (Validator.isEmpty(data.profileData.fullName)) {
    errors.fullName = 'Tên không được bỏ trống';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
