import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TextInputAuth from '../../../HOC/TextInputAuth';
import { forgetPassword } from '../../../actions/auth.action';
import '../Login/Login.scss';
class Login extends Component {
  static propTypes = {
    forgetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      errors: {},
      forgetSuccess: false
    };
  }
  componentWillReceiveProps(nextPops) {
    if (nextPops.auth.forgetSuccess) {
      this.setState({
          ...this.state,
          forgetSuccess: true
      })
    }
    if (nextPops.errors) {
      this.setState({ errors: nextPops.errors });
    }
  }

//   componentDidMount() {
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push('/');
//     }
//   }

  onSubmit(e) {
    e.preventDefault();
    const email = this.state.email
    this.props.forgetPassword(email);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { email, errors, forgetSuccess } = this.state;
    let Content = (!forgetSuccess) ? (
        <form
        id="loginForm"
        noValidate
        onSubmit={e => this.onSubmit(e)}
        >
            <hr className="border-gray my-0" />
            <div className="px-5 py-3">
                <p className="text-center">Chào bạn <br />hãy nhập địa chỉ email để lấy lại mật khẩu<br />
                    <span id="sp-message-login" />
                </p>
                <TextInputAuth
                    id="email"
                    name="email"
                    className="form-control form-control-lg rounded"
                    placeholder="Nhập email"
                    title="Nhập email"
                    type="input"
                    onChange={e => this.onChange(e)}
                    value={email}
                    error={errors.email}
                />
                <button className="btn btn-lg btn-block btn-warning text-uppercase fs-13 rounded mt-5">Nhận mật khẩu mới</button>
            </div>
        </form>
    ):(
        <div className="px-5 py-3">
            <h6 className="text-center">Mật khẩu mới đã được gửi tới email của bạn<br />
                <span id="sp-message-login" />
            </h6>
            <div>
                <div className="text-center fs-15 p-3">
                    Copy mật khẩu mới đã được gửi{' '}
                    <div className="d-inline-block">
                    Sau đó{' '}
                    <Link className="text-primary" to="/login">
                        <ins style={{ color: '#ffc107', fontSize: '15px' }}>
                        click vào đây để đăng nhập
                        </ins>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    );
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
                                <div className="fs-13" id="formLogin">
                                    <div className="tm-regform__header d-flex justify-content-between align-items-center p-3">
                                        <h2>Quên mật khẩu</h2>
                                    </div>

                                    {/* <form
                                    id="loginForm"
                                    noValidate
                                    onSubmit={e => this.onSubmit(e)}
                                    >
                                        <hr className="border-gray my-0" />
                                        <div className="px-5 py-3">
                                            <p className="text-center">Chào bạn <br />hãy nhập địa chỉ email để lấy lại mật khẩu<br />
                                                <span id="sp-message-login" />
                                            </p>
                                            <TextInputAuth
                                                id="email"
                                                name="email"
                                                className="form-control form-control-lg rounded"
                                                placeholder="Nhập email"
                                                title="Nhập email"
                                                type="input"
                                                onChange={e => this.onChange(e)}
                                                value={email}
                                                error={errors.email}
                                            />
                                            <button className="btn btn-lg btn-block btn-warning text-uppercase fs-13 rounded mt-5">Nhận mật khẩu mới</button>
                                        </div>
                                    </form> */}
                                    {Content}
                                </div>
                            <div>
                                <hr className="border-gray my-0" />

                                <div className="text-center fs-13 p-3">
                                    Bạn chưa có tài khoản?{' '}
                                    <div className="d-inline-block">
                                        Hãy{' '}
                                        <Link className="text-primary" to="/register">
                                        <ins style={{ color: '#ffc107', fontSize: '13px' }}>
                                            đăng kí ngay bây giờ
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
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = { forgetPassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
