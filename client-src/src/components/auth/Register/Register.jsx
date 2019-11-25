import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Register.scss';
import { registerUser } from '../../../actions/auth.action';
import TextInputAuth from '../../../HOC/TextInputAuth';
import { getCities, getDistricts } from '../../../utils/getVNdata';
const Cities = getCities();
class Register extends Component {
  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      password: '',
      password2: '',
      province: 'HANOI',
      district: 'QUANBADINH',
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) { 
      this.props.history.push('/');
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      fullname,
      email,
      password2,
      password,
      province,
      district,
    } = this.state;
    const newUser = {
      fullname,
      email,
      password2,
      password,
      province,
      district,
    };
    //console.log(newUser);

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const {
      fullname,
      email,
      password2,
      password,
      province,
      district,
      errors,
    } = this.state;
    return (
      <div className="page-wrapper page-home">
          <div className="main-page">
            <div className="container py-5">
      <div className="tm-reg">
        <div className="row gutter-10px flex-column-reverse flex-md-row">
          <div className="col-main col-md-6 d-flex">
            <div
              className="tm-reg__banner w-100"
              style={{
                backgroundImage:
                  'url(https://res.cloudinary.com/dz1gprgpn/image/upload/v1557046972/statics/bg-login_ayzs2e.jpg)',
              }}
            />
          </div>
          <div className="col-aside col-md-6 d-flex mb-5 mb-md-0">
            <div className="tm-regform d-flex flex-column justify-content-between w-100 border border-gray bg-white">
              <div className="fs-13" id="divFormRegister">
                <form
                  id="signupForm"
                  noValidate
                  onSubmit={e => this.onSubmit(e)}
                >
                  <div className="tm-regform__header d-flex justify-content-between align-items-center p-3">
                    <h2 className="text-uppercase fs-16 fw-4 mb-0">
                      Đăng ký tài khoản
                    </h2>
                    <Link className="text-primary fs-13" to="/login">
                      <ins>Đăng nhập</ins>
                    </Link>
                  </div>

                  <hr className="border-gray my-0" />

                  <div className="px-5 py-3">
                    <p className="text-center">
                      Hãy đăng ký ngay bây giờ <br />
                      để làm thành viên của cửa hàng sách.
                      <span id="sp-message-login" />
                    </p>
                    <TextInputAuth
                      id="fullname"
                      name="fullname"
                      className="form-control form-control-lg fs-13 px-3 rounded"
                      placeholder="Họ và tên"
                      title="Họ và tên"
                      type="text"
                      onChange={e => this.onChange(e)}
                      value={fullname}
                      error={errors.fullname}
                    />
                    <TextInputAuth
                      id="email"
                      name="email"
                      className="form-control form-control-lg fs-13 px-3 rounded"
                      placeholder="Email"
                      title="Email"
                      type="text"
                      onChange={e => this.onChange(e)}
                      value={email}
                      error={errors.email}
                    />
                    <TextInputAuth
                      id="password"
                      name="password"
                      className="form-control form-control-lg fs-13 px-3 rounded"
                      placeholder="Nhập mật khẩu"
                      title="Nhập mật khẩu"
                      type="password"
                      onChange={e => this.onChange(e)}
                      value={password}
                      error={errors.password}
                    />
                    <TextInputAuth
                      id="password2"
                      name="password2"
                      className="form-control form-control-lg fs-13 px-3 rounded"
                      placeholder="Nhập lại mật khẩu"
                      title="Nhập lại mật khẩu"
                      type="password"
                      onChange={e => this.onChange(e)}
                      value={password2}
                      error={errors.password2}
                    />
                    <div className="form-group">
                      <select
                        className="form-control form-control-lg fs-13 px-3 rounded"
                        id="province"
                        name="province"
                        onChange={e => this.onChange(e)}
                        value={province}
                      >
                        {Cities.map((city, index) => {
                          return (
                            <option key={index} value={city[0]}>
                              {city[1]}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <select
                        className="select optional form-control input-lg fs-14"
                        id="district"
                        name="district"
                        onChange={e => this.onChange(e)}
                        value={district}
                      >
                        {getDistricts(province).map((dis, index) => {
                          return (
                            <option key={index} value={dis[0]}>
                              {dis[1]}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="text-gray mb-3">
                      <label className="custom-control custom-checkbox fs-13 mb-0">
                        <input
                          name="agree"
                          type="checkbox"
                          className="custom-control-input"
                        />
                        <span className="custom-control-indicator" />
                        <span className="custom-control-description">
                          {'  '}
                          Tôi đồng ý với các{' '}
                          <a
                            className="text-primary"
                            href="/dieu-khoan.html"
                            target="_blank"
                            style={{ fontSize: '13px' }}
                          >
                            Điều khoản
                          </a>{' '}
                          của chúng tôi
                        </span>
                      </label>
                    </div>

                    <button
                      className="btn btn-lg btn-block btn-warning text-uppercase"
                      style={{ fontSize: '13px' }}
                    >
                      Đăng ký
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <hr className="border-gray my-0" />

                <div className="text-center fs-13 p-3">
                  Bạn đã có tài khoản?{' '}
                  <div className="d-inline-block">
                    Hãy{' '}
                    <Link className="text-primary" to="/login">
                      <ins style={{ color: '#ffc107', fontSize: '13px' }}>
                        click vào đây để đăng nhập
                      </ins>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth, // lấy auth của thằng authReducer trong /reducers/index
  errors: state.errors,
});

const mapDispatchToProps = {
  registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
