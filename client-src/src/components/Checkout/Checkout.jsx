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

    onCheckOutConfirm = (profileData, cart, checkOutType) => {
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
        console.log(checkOutData)
        this.props.checkOutConfirm(checkOutData);
        this.setState({
            ...this.state,
            isVisible: true
        })
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
                                Direct Bank Transfer
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option2" checked={this.state.checkOutType === 2 ? true : false} onClick={this.onClick(2)}/>
                                Cheque Payment
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option3" checked={this.state.checkOutType === 3 ? true : false} onClick={this.onClick(3)}/>
                                Cash on Delivery
                            </label>
                            </div>
                        </form>
                    </div>
                    <div className="checkout col-12">
                        <div className="checkout__btn text-center">
                            <a onClick={()=>{this.onCheckOutConfirm(this.state.profileData, this.props.cart, this.state.checkOutType)}}>Check Out</a>
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
                                <h3 class="onder__title">Your order</h3>
                                <ul class="order__total">
                                    <li>Product</li>
                                    <li>Total</li>
                                </ul>
                                <ul class="order_product">
                                    {Items}
                                </ul>
                                <ul class="shipping__method">
                                    <li>Cart Subtotal <span>${total}</span></li>
                                    <li>Shipping <span>${shipping}</span></li>
                                </ul>
                                <ul class="total__amount">
                                    <li>Order Total <span>${total + shipping}</span></li>
                                </ul>
                            </div>
                            <div id="accordion" class="checkout_accordion mt--30" role="tablist">
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingOne">
                                        <a class="checkout__title" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <span>Direct Bank Transfer</span>
                                        </a>
                                    </div>
                                    <div id="collapseOne" class="collapse show" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="payment-body">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</div>
                                    </div>
                                </div>
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingTwo">
                                        <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <span>Cheque Payment</span>
                                        </a>
                                    </div>
                                    <div id="collapseTwo" class="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div class="payment-body">Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</div>
                                    </div>
                                </div>
                                <div class="payment">
                                    <div class="che__header" role="tab" id="headingThree">
                                        <a class="collapsed checkout__title" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <span>Cash on Delivery</span>
                                        </a>
                                    </div>
                                    <div id="collapseThree" class="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div class="payment-body">Pay with cash upon delivery.</div>
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
  