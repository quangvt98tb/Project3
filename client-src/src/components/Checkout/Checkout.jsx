import React, { Component } from 'react';
import './Checkout.scss';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile.action';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
import Details from './Details';
import { checkOutConfirm } from '../../actions/checkout.action'
import SweetAlert from 'react-bootstrap-sweetalert';
  
class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkOutType: 1,
            profileData: {},
            isVisible: false,
            isRedirect: false,
        };
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onClick = radNum => () => {
        this.setState({
            ...this.state,
            checkOutType: radNum,
        })
    }

    getChildState = (profileData) => {
        this.setState({
            ...this.state,
            profileData: profileData
        })
    }

    async onCheckOutConfirm(profileData, cart, checkOutType) {
        let cart_ = {
            addedItems: cart.addedItems.reduce((all, value) => [...all, ...value], []),
            total: cart.total,
            shipping: cart.shipping,
            grandTotal: cart.total + cart.shipping
        }
        let checkOutData = {
            profileData: profileData,
            cart: cart_,
            checkOutType: checkOutType
        }
        await this.props.checkOutConfirm(checkOutData);
        if (this.props.cart.isCheckOut === true){
            this.setState({
                ...this.state,
                isVisible: true
            })
        }
    }

    onConfirm(){
        this.setState({
            ...this.state,
            isVisible: false,
            isRedirect: true
        })
    }

    render(){
        // const emailValidation = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(String(email).toLowerCase())
        let { profile, loading } = this.props.profile;
        let addedItems = this.props.cart.addedItems.reduce((all, value) => [...all, ...value], []);
        let {total, shipping} = this.props.cart;
        let Content =
        loading || profile === null ? (
          <SwappingSquaresSpinner />
        ) : (
            <div class="col-lg-6 col-12">
                <Details profile={profile} getChildState={this.getChildState}/>
            </div>
        );
        let Items = addedItems.map((product, index) => {
            return (
                <li>{product.title} × {product.quantity}<span>${product.price * product.quantity}</span></li>
        )});

        let alertSucc= (!this.state.isVisible) ? (
            <></>
        ) : (
            <SweetAlert success title="Success!" onConfirm={()=>{this.onConfirm()}}>
            </SweetAlert>
        );
        let redirect = (!this.state.isRedirect) ? (
            <></>
        ) : (
            <Route><Redirect to="/login"/></Route>
        );

        let checkOutComp = (
            <div>
                <label style={{fontSize:15 , fontWeight:600, marginTop: 10}}>Lựa chọn phương thức thanh toán</label>
                <div className="row">
                    <div className="col-12">
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option1" checked={this.state.checkOutType === 1 ? true : false} onClick={this.onClick(1)}/>
                                Chuyển khoản trực tiếp
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option2" checked={this.state.checkOutType === 2 ? true : false} onClick={this.onClick(2)}/>
                                Thanh toán qua thẻ ngân hàng
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option3" checked={this.state.checkOutType === 3 ? true : false} onClick={this.onClick(3)}/>
                                COD
                            </label>
                            </div>
                        </form>
                    </div>
                    <div className="checkout col-12">
                        <div className="checkout__btn text-center">
                            <a onClick={()=>{this.onCheckOutConfirm(this.state.profileData, this.props.cart, this.state.checkOutType)}}>Thanh toán</a>
                        </div>
                    </div>
                </div>
            </div>
        );
            return (
                <section class="wn__checkout__area section-padding--lg bg__white">
                <div class="container">
                    <div class="row">
                        {Content}
                        <div class="col-lg-6 col-12 md-mt-40 sm-mt-40">
                            <div class="wn__order__box">
                                <h3 class="onder__title">Đơn hàng của bạn</h3>
                                <ul class="order__total">
                                    <li>Sản phẩm</li>
                                    <li>Tổng tiền</li>
                                </ul>
                                <ul class="order_product">
                                    {Items}
                                </ul>
                                <ul class="shipping__method">
                                    <li>Tổng tiền sản phẩm <span>${total}</span></li>
                                    <li>Giao hàng <span>${shipping}</span></li>
                                </ul>
                                <ul class="total__amount">
                                    <li>Tổng thanh toán <span>${total + shipping}</span></li>
                                </ul>
                            </div>
                            <div id="accordion" class="checkout_accordion mt--30" role="tablist">
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingOne">
                                        <a class="checkout__title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <span>Chuyển khoản trực tiếp</span>
                                        </a>
                                    </div>
                                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="payment-body">Chuyển tiền trực tiếp tới tài khoản ngân hàng của cửa hàng. Điền chi tiết những thông tin cần thiết để cửa hàng hỗ trợ nếu xảy ra sai sót. Đơn hàng của bạn sẽ không được giao nếu tiền chưa được chuyển vào tài khoản của chúng tôi.</div>
                                    </div>
                                </div>
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingTwo">
                                        <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <span>Thanh toán qua thẻ ngân hàng</span>
                                        </a>
                                    </div>
                                    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div class="payment-body">Sử dụng thẻ ngân hàng, điền thông tin cần thiết tương ứng với thẻ và tiến hành thanh toán đơn hàng của bạn </div>
                                    </div>
                                </div>
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingThree">
                                        <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <span>COD (Nhận tiền khi giao hàng)</span>
                                        </a>
                                    </div>
                                    <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div class="payment-body">Giao dịch hoàn tất khi bạn nhận hàng và thanh toán với người giao hàng.</div>
                                    </div>
                                </div>
                            </div>
                            {checkOutComp}
                            {alertSucc}
                            {redirect}
                        </div>
                    </div>
                </div>
            </section>
                );
            }
        }

Checkout.propTypes = {
    cart: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    checkOutConfirm: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    cart: state.cart,
    profile: state.profile,
});

const mapDispatchToProps = {
    getCurrentProfile,
    checkOutConfirm
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Checkout);
  