import React, { Component } from 'react';
import './stylesheet/style.scss';
import { getOrderDetails, cancelOrder, editOrder } from '../../actions/order.action'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SweetAlert from 'react-bootstrap-sweetalert';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner.jsx';
import TextInputAuth from '../../HOC/TextInputAuth';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderCode: this.props.match.params.id,
            orderData: {},
            cancelTriggered: false,
            isSucc: false,
            isError: false,
            order: [],
            loading: true,
            fullName: '',
            phone: '',
            address: '',
            errors: {}
        }
	}
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    async componentDidMount(){
        await this.props.getOrderDetails(this.state.orderCode);
        let address = (this.props.orders.order === null) ? (
            ''
        ) : (
            String(this.props.orders.order.profileData.details + ', ' + this.props.orders.order.profileData.ward + ', ' + this.props.orders.order.profileData.district + ', ' +this.props.orders.order.profileData.province)
        );
        this.setState({
            ...this.state,
            order: this.props.orders.order,
            loading: this.props.orders.loading,
            fullName: this.props.orders.order.profileData.fullName,
            phone: this.props.orders.order.profileData.phone,
            address: address
        })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onTrigger(){
        let trig = this.state.cancelTriggered;
        this.setState({
            cancelTriggered: !trig,
        })
    }

    onSubmit(e){
        e.preventDefault();
        const {
            phone, fullName, address, orderCode
        } = this.state;
        let orderId = orderCode;
        const newInfo = {
            phone, fullName, address, orderId
        };
        this.props.editOrder(newInfo);
    }

    onConfirm(){
        this.setState({
            ...this.state,
            isSucc: false,
        })
    }

    onCancel(){
        this.setState({
            ...this.state,
            isError: false,
        })
    }

    async onCancelOrder(orderCode, status){
        await this.props.cancelOrder(orderCode, status);
        if (status === "Confirmed"){
            this.props.orders.order.status = "Canceled";
            this.setState({
                ...this.state,
                cancelTriggered: false,
                isSucc: true, 
            })
        } else {
            this.setState({
                ...this.state,
                cancelTriggered: false,
                isError: true,
            })
        }
    }

    render() {
        // const { loading } = this.props.orders;
        const { order, loading, address, errors, fullName, phone } = this.state;
        let orderData = order;
        let profileData = order.profileData;
        let cart = order.cart;
        let payment = null;
        switch (orderData.checkOutType){
            case 1:
                payment = "Chuyển khoản trực tiếp";
                break
            case 2:
                payment = "Thanh toán qua thẻ ngân hàng";
                break
            case 3:
                payment = "COD (Nhận tiền khi giao hàng)";
                break
            default:
                payment = "";
        }

        let CartData = (loading) || (order === null) ? (
            <></>
        ) : (
            orderData.cart.addedItems.map((item, index) => {
                return (
                    <tr>
                        <td className="text-center">
                            <div className="avatar">
                                <img className="img-avatar" src={item.imgUrl} alt="random img"/>
                            </div>
                        </td>
                        <td>
                            <div>{item.title}</div>
                        </td>
                        <td className="text-center">
                            <div>{item.author}</div>
                        </td>
                        <td className="text-center">
                            <div className="clearfix">
                                <div className="text-center">
                                    <strong>{item.quantity}</strong>
                                </div>
                            </div>
                        </td>
                        <td className="text-center">
                            <div>{item.price}</div>
                        </td>
                        <td className="text-center">
                            <strong>{item.price * item.quantity}</strong>
                        </td>
                    </tr>
                );
            })
        )

        let alertSucc= (!this.state.isSucc) ? (
            <></>
        ) : (
            <SweetAlert success title="Thành công!" onConfirm={()=>{this.onConfirm()}}>
            </SweetAlert>
        );

        let alertFailed= (!this.state.isError) ? (
            <></>
        ) : (
            <SweetAlert title="Không thể xóa đơn này!" onConfirm={()=>{this.onCancel()}}>
            </SweetAlert>
        );

        let alertComp = (!this.state.cancelTriggered) ? (
            <></>
        ) : (
            <SweetAlert
                warning
                showCancel
                confirmBtnText="Có!"
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="default"
                title="Bạn chắc chắn muốn hủy đơn này không?"
                onConfirm={()=>{this.onCancelOrder(this.state.orderCode, orderData.status)}}
                onCancel={()=>{this.onTrigger()}}
                >
            </SweetAlert>
        );
        if ((loading) || (order === null)){
            return(
                <SwappingSquaresSpinner/>
            );
        } else {
            return (
                <div className="container">
                <div style={{height: 20}}></div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                                        <h3>Chi tiết đơn hàng</h3>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12 col-sm-12">
                                                <div className="text-center">
                                                    <input
                                                    type="button"
                                                    id="btnUpdateInfoLender"
                                                    className="btn btn-warning mx-auto text-uppercase"
                                                    value="Hủy đơn hàng"
                                                    onClick={() => this.onTrigger()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form noValidate onSubmit={e => this.onSubmit(e)}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <label style={{fontSize: 15}}>Họ và tên<span>:</span></label>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="fullName"
                                                    name="fullName"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    placeholder="Họ và tên"
                                                    title="fullName"
                                                    type="tel"
                                                    onChange={e => this.onChange(e)}
                                                    value={fullName}
                                                    error={errors.fullName}
                                                />
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Email<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="email"
                                                    name="email"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    title="email"
                                                    value={profileData.email}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Số điện thoại<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="phone"
                                                    name="phone"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    placeholder="Số điện thoại"
                                                    title="phone"
                                                    type="tel"
                                                    onChange={e => this.onChange(e)}
                                                    value={phone}
                                                    error={errors.phone}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row"> 
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Hình thức thanh toán<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="payment"
                                                    name="payment"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    title="payment"
                                                    type="tel"
                                                    value={payment}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    `<label style={{fontSize: 15}}>Trạng thái<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="status"
                                                    name="status"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    title="status"
                                                    type="tel"
                                                    value={orderData.status}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Thời gian đặt hàng<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="orderDate"
                                                    name="orderDate"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    title="orderDate"
                                                    type="tel"
                                                    value={orderData.orderDate}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Thời gian ship<span>:</span></label>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <TextInputAuth
                                                    id="shipDate"
                                                    name="shipDate"
                                                    className="form-control form-control-lg fs-13 px-3 rounded"
                                                    title="shipDate"
                                                    type="tel"
                                                    value={orderData.shipDate}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-lg-6 col-md-6">
                                        <div className="row">
                                            <div className="col-sm-6 col-lg-6 col-md-6">
                                                <div className="">
                                                    <label style={{fontSize: 15}}>Địa chỉ giao hàng<span>:</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <TextInputAuth
                                                id="address"
                                                name="address"
                                                className="form-control form-control-lg fs-13 px-3 rounded"
                                                placeholder="Địa chỉ"
                                                title="address"
                                                type="address"
                                                onChange={e => this.onChange(e)}
                                                value={address}
                                                error={errors.address}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <input
                                    type="submit"
                                    className="btn btn-warning mx-auto text-uppercase"
                                    value="CẬP NHẬT THÔNG TIN"
                                />
                                </div>
                            </form>
                            <br/>
                            <br/>
                            <table className="table table-responsive-sm table-hover table-outline mb-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="text-center">Ảnh</th>
                                        <th>Tên sản phẩm</th>
                                        <th className="text-center">Tác giả</th>
                                        <th className="text-center">Số lượng</th>
                                        <th className="text-center">Đơn giá</th>
                                        <th className="text-center">Tổng giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CartData}
                                    <tr>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center">
                                            <div>Tổng phụ</div>
                                        </td>
                                        <td className="text-center">
                                            <strong>{cart.total}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center">
                                            <div>Phí ship</div>
                                        </td>
                                        <td className="text-center">
                                            <strong>{cart.shipping}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center">
                                            <div>Khuyến mãi</div>
                                        </td>
                                        <td className="text-center">
                                            <strong>{cart.saleValue} ({cart.sale})</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center"></td>
                                        <td></td>
                                        <td className="text-center">
                                            <h3>Tổng</h3>
                                        </td>
                                        <td className="text-center">
                                            <h3>{cart.grandTotal}</h3>
                                        </td>
                                    </tr>
                                 </tbody>
                            </table>
                        </div>
                    </div>
                    {alertComp}
                    {alertSucc}
                    {alertFailed}
                </div>
                </div>
                // </div>   
            )
        }
        // return (
        //     <></>
        // )
    };
}


OrderDetails.propTypes = {
    orders: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getOrderDetails: PropTypes.func.isRequired,
    cancelOrder: PropTypes.func.isRequired,
    editOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    orders: state.orders,
    errors: state.errors
});
  
const mapDispatchToProps = {
    getOrderDetails,
    cancelOrder,
    editOrder
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(OrderDetails);
// export default Product;