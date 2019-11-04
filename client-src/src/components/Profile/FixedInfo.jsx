import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const FixedInfo = props => {
  return (
    <div
      className="profilecard media bg-gray-lighter p-sm-4 p-3"
      style={{ marginBottom: '50px' }}
    >
      <div className="profilecard__body media-body align-self-center">
        <div className="fs-13 text-gray-light mb-0">
          <div className="row">
            <div className="col-3">
              <span>Thông tin tài khoản</span>
            </div>
              <div className="col-9">
                <span
                  style={{ position: 'absolute', right: '5%' }}
                  className="hidden-xs-down"
                >
                  {/* <Link
                    className="btn btn-warning text-uppercase text-white fs-15 fs-lg-15 btn-sm"
                    to="/purchasedhistory"
                  >
                    Quản lý đơn hàng
                  </Link> */}
                </span>
              </div>
          </div>
        </div>

        <hr className="mt-2 border-gray" />
        <div className="row  mb-4">
          <div className="col-md-6">
            <div className="row">
              <label className="col-sm-4 fs-13">Số điện thoại :</label>
              <label className="col-sm-4 fs-13">
                <b>{props.profile.phone}</b>
              </label>
            </div>
            <div className="row">
              <label className="col-sm-4 fs-13">
                Email:
                <span style={{ marginLeft: '8px' }}>:</span>
              </label>
              <label className="col-sm-4 fs-13">
                <b>{props.profile.email}</b>
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6">
            <div className="profilecard__progress">
              <p className="mb-0 text-gray-light fs-13">
                Bạn vui l&#242;ng cập nhật đầy đủ hồ sơ để kh&#225;ch h&#224;ng
                c&#243; thể kết nối được với bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedInfo;
