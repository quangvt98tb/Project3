import './Cart.scss'
import { connect } from 'react-redux';
import TextInputAuth from '../../HOC/TextInputAuth'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { changeQuantity, deleteAll, deleteFromCart, checkOut } from '../../actions/cart.action';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class Cart extends Component {
    constructor(props){
        super(props)
        let ship = this.props.cart.shipping;
        if (ship === 10){
            ship = "fast";
        } else {
            ship = "standard";
        }
        this.state = {
            addedItems: JSON.parse(JSON.stringify(this.props.cart.addedItems.reduce((all, value) => [...all, ...value], []))),
            dataList: {},
            shipping: ship,
            deleteAllTrigger:false,
            deleteAllSuccess: false,
        }
    }

    onChangeQuantity(quantity, productId){
        if (quantity > 0 || quantity === ''){
            this.state.dataList[productId] = quantity;
            let added = this.state.addedItems;
            let book = added.find(item => item.id === productId);
            book.quantity = quantity;
            this.setState({
                ...this.state,
                addedItems: added,
            });
        }
    }

    onDeleteAllClick(){
        this.setState({
            ...this.state,
            addedItems: [],
            deleteAllTrigger: false,
            deleteAllSuccess: true,
        })
        this.props.deleteAll();
    }

    onDeleteClick(productId){
        let productData = productId;
        let added = this.state.addedItems.filter(item=> item.id !== productData);
        this.setState({
            ...this.state,
            addedItems: added,
        })
        this.props.deleteFromCart(productData);
    }

    onChangeShipping(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onUpdateClick(dataList, shipping){
        this.props.changeQuantity(dataList, shipping);
    }

    onCheckOutClick(){
        this.props.checkOut();
    }

    onTrigger(){
        let trig = this.state.deleteAllTrigger;
        console.log(trig)
        this.setState({
            deleteAllTrigger: !trig,
        })
    }

    onConfirm(){
        this.setState({
            ...this.state,
            deleteAllSuccess: false,
        })
    }

    render(){
        const { total, shipping, error } = this.props.cart;
        const shipType = this.state.shipping;
        let addedItems = this.state.addedItems;
        let Content =  (addedItems === undefined) || (addedItems.length === 0) ? (
            <h6>Giỏ hàng trống</h6>
        ) : (
            addedItems.map((product, index) => {
                    return (
                        <tr>
                            <td className="product-thumbnail"><a href="#"><img src={product.imgUrl} alt="product img"/></a></td>
                            <td className="product-name"><a href="#">{product.title}</a></td>
                            <td className="product-price"><span className="amount">${product.price}</span></td>
                            <td className="product-quantity">
                                <div style={{width: 100, marginLeft:65}}>
									<TextInputAuth
                                        id="qty"
                                        name="quantity"
                                        className="form-control form-control-lg rounded"
                                        type="input-text"
                                        onChange={event => this.onChangeQuantity(event.target.value.replace(/\D/,''), product.id)}
                                        value={product.quantity}
                                        error={error}
                                    />
								</div>
                            </td>
                            
                            <td className="product-subtotal">${product.quantity * product.price}</td>
                            <td className="product-remove"><a onClick={()=>{this.onDeleteClick(product.id)}}>X</a></td>
                        </tr>
                    )
            }));
        
        let alertSucc= (!this.state.deleteAllSuccess) ? (
            <></>
        ) : (
            <SweetAlert success title="Success!" onConfirm={()=>{this.onConfirm()}}>
            </SweetAlert>
        );

        let alertComp = (!this.state.deleteAllTrigger) ? (
            <></>
        ) : (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Are you sure?"
                onConfirm={()=>{this.onDeleteAllClick()}}
                onCancel={()=>{this.onTrigger()}}
                >
                You will not be able to recover this imaginary file!
            </SweetAlert>
        );
        
        let Buttons = (addedItems === undefined) || (addedItems.length === 0) ? (
            <div className="cartbox__btn text-center">
                <div className="d-inline-block">
                    <p style={{fontSize: 20, fontWeight: 300, color: "black"}}>
                        Click{' '}
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
                <ul className="cart__btn__list d-flex flex-wrap flex-md-nowrap flex-lg-nowrap justify-content-between"> 
                    <li><a href="#" onClick={()=>{this.onTrigger()}}>Remove All</a></li>
                    <li><a href="#">Apply Code</a></li>
                    <li><a href="#" onClick={()=>{this.onUpdateClick(this.state.dataList, this.state.shipping)}}>Update Cart</a></li>
                    <li><Link to="/checkout"><a href="#" onClick={()=>{this.onCheckOutClick()}}>Check Out</a></Link></li>
                </ul>
            </div>
            );

        let CartAfter = (addedItems === undefined) || (addedItems.length === 0) ? (
                <></>
            ) : (
                <div className="row"> 
                    <div className="col-lg-6 col-md-6">
                        <div className="cartbox__total__area">
                            <div className="cartbox-total justify-content-between">
                                <div className="row">
                                    <div style={{height:25}}/>
                                    <div className="col-12">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb1" name="shipping" value="fast" checked={shipType === 'fast'} onChange={e => this.onChangeShipping(e)}/>
                                            <label className="custom-control-label" for="cb1">Fast Shipping with $10</label>
                                        </div>
                                    </div>
                                    <div style={{height:35}}/>
                                    <div className="col-12">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb2" name="shipping" value="standard" checked={shipType === 'standard'} onChange={e => this.onChangeShipping(e)}/>
                                            <label className="custom-control-label" for="cb2">Standard Shipping with $3</label>
                                        </div>
                                    </div>
                                    <div style={{height:20}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="cartbox__total__area">
                            <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                    <li>Cart total</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{total}</li>
                                </ul>
                            </div>
                            <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                    <li>Shipping</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{shipping}</li>
                                </ul>
                            </div>
                            <div className="cart__total__amount">
                                <span>Grand Total</span>
                                <span>{total + shipping}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        return(
            <div className="cart-main-area section-padding--lg" style={{backgroundColor: "white"}}>
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
                            {Buttons}
                        </div>
                    </div>
                    {CartAfter}
                    <div style={{height:35}}/>
                    {alertComp}
                    {alertSucc}
                </div> 
            </div>
            );
    }
}

Cart.propTypes = {
	cart: PropTypes.object.isRequired,
    changeQuantity: PropTypes.func.isRequired,
    deleteAll: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
	checkOut: PropTypes.func.isRequired,
};

const mapStateToProps = state=>({
    cart: state.cart,
});

const mapDispatchToProps = {
    changeQuantity,
    deleteAll,
    deleteFromCart,
    checkOut,
};

export default connect(mapStateToProps,mapDispatchToProps)(Cart);