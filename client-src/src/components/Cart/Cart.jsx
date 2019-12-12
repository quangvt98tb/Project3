import './Cart.scss'
import { connect } from 'react-redux';
import TextInputAuth from '../../HOC/TextInputAuth'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { changeQuantity, deleteAll, deleteFromCart, checkOut, getPromos } from '../../actions/cart.action';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Modal from 'react-responsive-modal';
import Promo from './Promo';

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
            promos: [],
            isShow: false,
            selectedPromo: ''
        }
    }

    onChangeQuantity(quantity, productId){
        if (quantity > 0 || quantity === ''){
            let tempDataList = this.state.dataList;
            tempDataList[productId] = parseInt(quantity);
            this.setState({
                ...this.state,
                dataList: tempDataList
            })
            // this.state.dataList[productId] = parseInt(quantity);
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

    onCheckOutClick(promo){
        this.props.checkOut(promo);
    }

    onTrigger(){
        let trig = this.state.deleteAllTrigger;
        this.setState({
            deleteAllTrigger: !trig,
        })
    }

    async onPromo(){
        await this.props.getPromos(localStorage.userId);
        this.setState({
            ...this.state,
            isShow: true,
            promos: this.props.promos.promos
        })
    }

    handleCloseModal(){
        this.setState({
            ...this.state,
            isShow: false
        })
    }

    getChildState = (isShow, selectedPromo) => {
        this.setState({
            ...this.state,
            isShow: isShow,
            selectedPromo: selectedPromo
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
        const { isShow, promos, selectedPromo } = this.state;
        
        let promo = promos.find(x=>x.id===selectedPromo);
        if (promo !== undefined){
            if (promo.minus === 0){
                let divide = promo.divide * 100;
                promo = {
                    "display": "Giảm " + divide.toString() + "%",
                    "value": promo.divide * (total + shipping)
                }
            } else {{
                let minus = promo.minus;
                promo = {
                    "display": "Giảm " + minus.toString() + "$",
                    "value": promo.minus
                }
            }}
        } else {
            promo = {
                "display": "",
                "value": 0
            }
        }

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
                                    error={error[product.id]}
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
            <SweetAlert success title="Thành công!" onConfirm={()=>{this.onConfirm()}}>
            </SweetAlert>
        );

        let alertComp = (!this.state.deleteAllTrigger) ? (
            <></>
        ) : (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Có, xóa tất cả!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Bạn chắc chắn không?"
                onConfirm={()=>{this.onDeleteAllClick()}}
                onCancel={()=>{this.onTrigger()}}
                >
            </SweetAlert>
        );
        
        let Buttons = (addedItems === undefined) || (addedItems.length === 0) ? (
            <div className="cartbox__btn text-center">
                <div className="d-inline-block">
                    <p style={{fontSize: 20, fontWeight: 300, color: "black"}}>
                        Ấn{' '}
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
                    <li><a href="#" onClick={()=>{this.onTrigger()}}>Xóa tất cả</a></li>
                    <li><a href="#" onClick={()=>{this.onPromo()}}>Dùng mã Code</a></li>
                    <li><a href="#" onClick={()=>{this.onUpdateClick(this.state.dataList, this.state.shipping)}}>Cập nhật</a></li>
                    <li><Link to="/checkout" onClick={()=>{this.onCheckOutClick(promo)}}>Thanh toán</Link></li>
                </ul>
            </div>
            );
        
        let grandTotal = total - promo.value;
        if (grandTotal < 0){ grandTotal = 0 };

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
                                            <label className="custom-control-label" for="cb1">Giao hàng nhanh với $10</label>
                                        </div>
                                    </div>
                                    <div style={{height:35}}/>
                                    <div className="col-12">
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="cb2" name="shipping" value="standard" checked={shipType === 'standard'} onChange={e => this.onChangeShipping(e)}/>
                                            <label className="custom-control-label" for="cb2">Giao hàng tiêu chuẩn với $3</label>
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
                                    <li>Tổng sản phẩm</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{total}</li>
                                </ul>
                            </div>
                            <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                    <li>Giao hàng</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{shipping}</li>
                                </ul>
                            </div>
                            <div className="cartbox-total d-flex justify-content-between">
                                <ul className="cart__total__list">
                                    <li>Khuyến mãi</li>
                                </ul>
                                <ul className="cart__total__tk">
                                    <li>{promo.value}</li>
                                </ul>
                            </div>
                            <div className="cart__total__amount">
                                <span>Tổng thanh toán</span>
                                <span>{grandTotal + shipping}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        return(
            <div className="cart-main-area section-padding--lg" style={{backgroundColor: "white"}}>
                <div className="container">
                <Modal open={isShow} onClose={() => this.handleCloseModal()} center>
                    <Promo
                        promos={promos}
                        getChildState={this.getChildState}
                    />
                </Modal>
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ol-lg-12">
                            <form action="#">               
                                <div className="table-content wnro__table table-responsive">
                                    <table>
                                        <thead>
                                            <tr className="title-top">
                                                <th className="product-thumbnail">Ảnh</th>
                                                <th className="product-name">Tên sản phẩm</th>
                                                <th className="product-price">Giá</th>
                                                <th className="product-quantity">Số lượng</th>
                                                <th className="product-subtotal">Tổng tiền</th>
                                                <th className="product-remove">Xóa</th>
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
    promos: PropTypes.object.isRequired,
    changeQuantity: PropTypes.func.isRequired,
    deleteAll: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    checkOut: PropTypes.func.isRequired,
    getPromos: PropTypes.func.isRequired,
};

const mapStateToProps = state=>({
    cart: state.cart,
    promos: state.promos
});

const mapDispatchToProps = {
    changeQuantity,
    deleteAll,
    deleteFromCart,
    checkOut,
    getPromos
};

export default connect(mapStateToProps,mapDispatchToProps)(Cart);