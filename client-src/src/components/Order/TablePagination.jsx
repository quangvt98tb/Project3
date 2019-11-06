import React, { Component } from "react";
import PaginationDeck from './Pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import OrderDetails from './OrderDetails';
import { Link } from 'react-router-dom';
// import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
import { getOrders, getOrderDetails } from '../../actions/order.action';
import './TablePagination.scss';
 
class TableP extends Component {
  constructor(props){
    super(props);

    this.state = {
      allOrders: [], 
      currentOrder: [], 
      currentPage: null, 
      totalPages: null
    }
  }

  async componentDidMount() {
    await this.props.getOrders();
    this.setState({
      ...this.state,
      allOrders: this.props.orders.orders
    })
  }

  onViewDetails(orderCode){
    this.props.getOrderDetails(orderCode);
  }

  onPageChanged = data => {
    const { allOrders } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentOrder = allOrders.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentOrder, totalPages });
  }

  formatBookTitles(books) {
    if (books.length === 1){
      return books[0].title;
    } else {
      return (String(books[0].title) + " và " + (books.length -1)  + " cuốn sách khác");
    }
  }

  render() {
    const {allOrders, currentOrder, currentPage, totalPages } = this.state;
    const totalOrders = (allOrders === null) ? (
      0
    ) : (
      allOrders.length
    );

    // let pagination = (allOrders === null) ? (
    //   <></>
    // ) : (
    //   <PaginationDeck totalRecords={totalOrders} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
    // );

    // let paginationComp = (this.props.orders.orders === null) ? (
    //     <></>
    //   ) : (
    //     // <PaginationDeck totalRecords={totalOrders} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
    //     this.setState({
    //       ...this.state,
    //       allOrders: this.props.orders.orders
    //     })
    //   );
    
    //   console.log(paginationComp)

    let Content =  (allOrders === null) || (allOrders[0] === "empty") ? (
        <h6>Đơn hàng trống</h6>
    ) : (currentOrder.map((order, index) => {
          return (
              <tr onClick={()=>this.onViewDetails(order.orderCode)}>
                  <td className="product-thumbnail"><a href="#">{order.orderCode}</a></td> 
                  <td className="product-name"><a href="#">{this.formatBookTitles(order.books)}</a></td>
                  <td className="product-price"><span className="amount">{order.orderDate}</span></td>
                  <td className="product-ship"><span className="amount">{order.shipDate}</span></td>
                  <td className="product-quantity">{order.fullName}</td>
                  <td className="product-subtotal">{order.status}</td>
                  <td className="product-remove"><a>X</a></td>
                  <td className="product-details"><Link to={`/orderdetails/${order.orderCode}`}>here</Link></td>
              </tr>
          )}));

    if (totalOrders === 0) return null;
    return (
          <div className="container">
            <div className="cart-main-area section-padding--lg" style={{backgroundColor: "white"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 ol-lg-12">
                            <form action="#">               
                                <div className="table-content wnro__table table-responsive">
                                    <table>
                                        <thead>
                                            <tr className="title-top">
                                                <th className="product-thumbnail">Order Code</th>
                                                <th className="product-name">Books</th>
                                                <th className="product-price">Order Date</th>
                                                <th className="product-ship">Ship Date</th>
                                                <th className="product-quantity">Full Name</th>
                                                <th className="product-subtotal">Status</th>
                                                <th className="product-remove">Remove</th>
                                                <th className="product-details">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Content}
                                        </tbody>
                                    </table>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div> 
            </div>
         <div style={{ height: 30 }}></div>
          <PaginationDeck totalRecords={totalOrders} pageLimit={5} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          {/* {paginationComp}
          {pagination} */}
          <div style={{ height: 50 }}></div>
          </div>
    );
  }
}

TableP.propTypes = {
  orders: PropTypes.object.isRequired,
  getOrders: PropTypes.func.isRequired,
  getOrderDetails: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  orders: state.orders,
});

const mapDispatchToProps = {
  getOrders,
  getOrderDetails
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableP);
