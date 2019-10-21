import './Cart.scss'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ProductDetails from '../Product/ProductDetails';
import { Link } from 'react-router-dom'

class Cart extends Component {
    constructor(props){
        super(props)
    }

    render(){
    const { total } = this.props.cart
    let { addedItems } = this.props.cart
    addedItems = addedItems[0]
    console.log(addedItems)
    let Content = (addedItems.length === 0) || (addedItems == undefined) ? (
        <h6>Giỏ hàng trống</h6>
      ) : (
        addedItems.map((productDetails, index) => {
        return (
            <tr>
                <td className="product-thumbnail"><a href="#"><img src={productDetails.imgUrl} alt="product img"/></a></td>
                <td className="product-name"><a href="#">{ProductDetails.title}</a></td>
                <td className="product-price"><span className="amount">${productDetails.price}</span></td>
                <td className="product-quantity"><input type="number" value={productDetails.quantity}/></td>
                <td className="product-subtotal">${productDetails.quantity * productDetails.price}</td>
                <td className="product-remove"><a href="#">X</a></td>
            </tr>
        )}));
    
    let CheckoutButton = addedItems.length === 0 ? (
        <div className="cartbox__btn text-center">
            <div className="d-inline-block">
                <p style={{fontSize: 20, fontWeight: 300, color: "black"}}>
                    Hãy{' '}
                    <Link className="text-primary" to="/">
                        <ins style={{ color: '#ffc107', fontSize: '20px' }}>
                        vào đây
                        </ins>
                    </Link>
                    {' '}để trở về trang chủ
                </p>
            </div>
        </div>
        ) : (
        <div className="cartbox__btn">
            <ul className="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-center"> 
                {/* <li><a href="#">Coupon Code</a></li>
                <li><a href="#">Apply Code</a></li>
                <li><a href="#">Update Cart</a></li> */}
                <li><a href="#">Check Out</a></li>
            </ul>
        </div>
        );

        let GrandTotal = addedItems.length === 0 ? (
            <></>
        ) : (
            <div className="cart__total__amount">
                <span>Grand Total</span>
                <span>{total}</span>
            </div>
        );
        return(
        <div className="cart-main-area section-padding--lg bg--white">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 ol-lg-12">
                        <form action="#">               
                            <div className="table-content wnro__table table-responsive">
                                <table>
                                    <thead>
                                        <tr className="title-top">
                                            <th className="product-thumbnail">Image</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Content}
                                    </tbody>
                                </table>
                            </div>
                        </form> 
                            {/* justify-content-between */}
                        {CheckoutButton}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 offset-lg-6">
                        <div className="cartbox__total__area">
                            {/* <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                    <li>Cart total</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{total}</li>
                                </ul>
                            </div> */}
                            {GrandTotal}
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        );
    }
}

Cart.propTypes = {
	items: PropTypes.object.isRequired,
	// getBookById: PropTypes.func.isRequired,
	// addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state=>({
    cart: state.cart,
});

const mapDispatchToProps = (dispatch)=>{
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)