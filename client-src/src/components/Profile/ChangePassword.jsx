import React, { Component } from "react";
import TextInputAuth from '../../HOC/TextInputAuth';
import './ChangePassword.scss';
import { changePassword } from '../../actions/auth.action';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

class ChangePassword extends Component {
    constructor(props){
      super(props);

      this.state = {
          password1: '',
          password2: '',
          passwordOld: '',
          errors: {},
          changeSuccess: false,
      }
    }

    componentWillReceiveProps(nextPops) {
        if (nextPops.errors) {
            this.setState({ 
                ...this.state, 
                errors: nextPops.errors
            });
        }
        //   this.props.history.push('/');
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onClick(){
        const { password1, password2, passwordOld } = this.state;
        await this.props.changePassword(password1, password2, passwordOld); 
        this.setState({
            ...this.state,
            changeSuccess: this.props.auth.changeSuccess
        })    
    }

    onConfirm(){
        this.setState({
            ...this.state,
            changeSuccess: false
        })
    }
  
    render() {
        const { password1, password2, errors } = this.state;
        let alertSucc= (!this.state.changeSuccess) ? (
            <></>
        ) : (
            <SweetAlert success title="Thay mật khẩu thành công!" onConfirm={()=>{this.onConfirm()}}>
            </SweetAlert>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h1>Đổi mật khẩu</h1>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-sm-12 text-center">
                        <p className="">Thay đổi mật khẩu của bạn</p>
                        <form method="post" id="passwordForm" className="text-center">
                            <div className="col-lg-12 col-md-12 input-password">
                                <div className="row">
                                    <label
                                        htmlFor="txtPhone"
                                        className="col-sm-4 col-form-label text-sm-right"
                                    >
                                        Nhập mật khẩu cũ:
                                    </label>
                                    <div className="col-xl-8 col-sm-7">
                                        <div className="w-50">
                                            <TextInputAuth
                                                id="passwordOld"
                                                name="passwordOld"
                                                className="form-control form-control-lg fs-13 px-3 rounded"
                                                placeholder="Mật khẩu cũ"
                                                title="passwordOld"
                                                type="password"
                                                onChange={e => this.onChange(e)}
                                                error={errors.passwordOld}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{height: 20}}></div>
                            <div className="col-lg-12 col-md-12 input-password">
                                <div className="row">
                                    <label
                                        htmlFor="txtPhone"
                                        className="col-sm-4 col-form-label text-sm-right"
                                    >
                                        Nhập mật khẩu mới:
                                    </label>
                                    <div className="col-xl-8 col-sm-7">
                                        <div className="w-50">
                                            <TextInputAuth
                                                id="password1"
                                                name="password1"
                                                className="form-control form-control-lg fs-13 px-3 rounded"
                                                placeholder="Mật khẩu mới"
                                                title="password1"
                                                type="password"
                                                onChange={e => this.onChange(e)}
                                                value={password1}
                                                error={errors.password1}
                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div style={{height: 20}}></div>
                            <div className="col-lg-12 col-md-12 input-password">
                                <div className="row">
                                        <label
                                            htmlFor="txtPhone"
                                            className="col-sm-4 col-form-label text-sm-right"
                                        >
                                            Nhập lại mật khẩu mới:
                                        </label>
                                        <div className="col-xl-8 col-sm-7">
                                            <div className="w-50">
                                                <TextInputAuth
                                                    id="password2"
                                                    name="password2"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    placeholder="Nhập lại mật khẩu mới"
                                                    title="password2"
                                                    type="password"
                                                    onChange={e => this.onChange(e)}
                                                    value={password2}
                                                    error={errors.password2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div style={{height: 20}}></div>
                            <input type="button" className="col-xs-12 btn btn-primary btn-load btn-lg" data-loading-text="Changing Password..." value="Change Password" onClick={()=> this.onClick()}/>
                            <div style={{height: 20}}></div>
                        </form>
                    </div>
                </div>
                {alertSucc}
            </div>
        );
    }
}

ChangePassword.propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    changePassword: PropTypes.func.isRequired,
};
    
const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

const mapDispatchToProps = { changePassword };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
  