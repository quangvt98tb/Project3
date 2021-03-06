import React, { Component } from 'react';
import './Checkout.scss';
import TextInputAuth from '../../HOC/TextInputAuth';
import { getCities, getDistricts } from '../../utils/getVNdata';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Cities = getCities();

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: '',
            phone: '',
            email: '',
            province: '',
            district: '',
            ward: '',
            details: '',
            errors: {}
          };
        this.props.getChildState(this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    componentDidMount() {
        // console.log(this.props.profile)
        const { address, fullName, phone, email } = this.props.profile;
        const { province, district, ward, details } = address;

        this.setState({
            fullName,
            phone,
            email,
            province,
            district,
            ward,
            details,
        });
        this.props.getChildState({
            ...this.state,
            fullName,
            phone,
            email,
            province,
            district,
            ward,
            details,
        });
    }

    onChange(e) {
        if (e.target.name === "province"){
            this.setState({ 
              [e.target.name]: e.target.value,
              district: getDistricts(e.target.value)[0][0]
            });
            this.props.getChildState({
                ...this.state,
                [e.target.name]: e.target.value,
                district: getDistricts(e.target.value)[0][0]
            });
          } else{
            this.setState({ [e.target.name]: e.target.value });
            this.props.getChildState({
                ...this.state,
                [e.target.name]: e.target.value,
            });
          }
    }

    render(){
        // const emailValidation = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(String(email).toLowerCase())
        const {
            fullName,
            phone,
            email,
            province,
            district,
            ward,
            details,
            errors
          } = this.state;
        return (      
            <div class="customer_details">
                <h3>Chi tiết đơn thanh toán</h3>
                <div class="customar__field">
                    <div class="input_box">
                        <label>Tên <span>*</span></label>
                        <TextInputAuth
                            id="fullName"
                            name="fullName"
                            className="form-control form-control-lg fs-13 px-3 rounded"
                            placeholder="Họ và tên"
                            title="Name"
                            type="text"
                            onChange={e => this.onChange(e)}
                            value={fullName}
                            error={errors.fullName}
                            disabled={false}
                        />
                    </div>
                
                    <div className="input_box">
                        <label>Thành phố<span>*</span></label>
                        <div>
                            <select
                            className="form-control"
                            id="cbCity"
                            name="province"
                            value={province}
                            onChange={e => this.onChange(e)}
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
                    </div>
                    <div className="input_box">
                        <label>Quận <span>*</span></label>
                        <div>
                            <select
                            className="form-control"
                            id="cbDistrict"
                            name="district"
                            value={district}
                            onChange={e => this.onChange(e)}
                            >
                            {province &&
                                getDistricts(province).map((dis, index) => {
                                return (
                                    <option key={index} value={dis[0]}>
                                    {dis[1]}
                                    </option>
                                );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="input_box">
                        <label>Phường/Xã <span>*</span></label>
                        <div>
                            <TextInputAuth
                                id="ward"
                                name="ward"
                                className="form-control form-control-lg fs-13 px-3 rounded"
                                placeholder="Phường/Xã"
                                title="Ward"
                                type="text"
                                onChange={e => this.onChange(e)}
                                value={ward}
                                error={errors.ward}
                                disabled={false}
                            />
                        </div>
                    </div>
                    <div className="input_box">
                        <label>Địa chỉ chi tiết <span>*</span></label>
                        <div>
                        <TextInputAuth
                            id="details"
                            name="details"
                            className="form-control form-control-lg fs-13 px-3 rounded"
                            placeholder="Địa chỉ"
                            title="Details"
                            type="text"
                            onChange={e => this.onChange(e)}
                            value={details}
                            error={errors.details}
                            disabled={false}
                        />
                        </div>
                        </div>
                    <div class="input_box">
                        <label>Số điện thoại <span>*</span></label>
                        <TextInputAuth
                            id="phone"
                            name="phone"
                            className="form-control form-control-lg fs-13 px-3 rounded"
                            placeholder="Số điện thoại"
                            title="Phone"
                            type="tel"
                            onChange={e => this.onChange(e)}
                            value={phone}
                            error={errors.phone}
                            disabled={false}
                        />
                    </div>

                    <div class="input_box">
                        <label>Email <span>*</span></label>
                        <TextInputAuth
                            id="email"
                            name="email"
                            className="form-control form-control-lg fs-13 px-3 rounded"
                            placeholder="Địa chỉ"
                            title="Email"
                            type="text"
                            onChange={e => this.onChange(e)}
                            value={email}
                            error={errors.email}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>      
        );
    }
}

Details.propTypes = {
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    errors: state.errors
});

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Details);