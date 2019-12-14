import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Button, Col, Row } from 'reactstrap';
import './MiniCart.scss';

const styles = {
    fontSize: {
      fontSize: '13px'
    },
    centerButtons: {
      display:'flex',
      justifyContent: 'center',
      margin: '10px',
      textDecoration: 'none'
    }
  };

class MiniCart extends Component {
    constructor(props){
      super(props);

      this.state = {
          addedItems: [],
          total: 0,
          shipping: 0,
          isVisible: false
      }
    }

    onClick() {
        let vis = this.state.isVisible;
        this.setState({
            ...this.state,
            isVisible: !vis
        })
    }
  
    render() {
        const { isVisible } = this.state;
        const cart = this.props.cart;
        const addedItems = cart.addedItems.reduce((all, value) => [...all, ...value], []);
        // const shipping = cart.shipping;
        // const total = cart.total;
        // const grandTotal = total + shipping;
        let empty = true;
        if (addedItems.length !== 0) {
            empty = false;
        }
        let Content = (!isVisible) ? (
            <></>
        ) : (
            <ListGroup className="list-group-abcd">
                {
                !empty ?
                <Fragment>
                    <ListGroupItem>
                    {
                        addedItems.slice(0,5).map(x=> 
                            <div className="item01 d-flex mt--20">
                                <div className="thumb">
                                    <a href="product-details.html"><img src={x.imgUrl} alt="product images"/></a>
                                </div>
                                <div className="content">
                                    <h6><a href="product-details.html" style={{color: "black"}}>{x.title}</a></h6>
                                    <p className="prize">${x.price}</p>
                                    <div className="product_prize d-flex justify-content-between">
                                        <h6 className="qun">Số lượng: {x.quantity}</h6>
                                        {/* <ul className="d-flex justify-content-end">
                                            <li><a href="#"><i className="zmdi zmdi-delete"></i></a></li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            {/* <Col>
                                <Link to="/checkout" style={styles.centerButtons}><Button outline color="secondary" size="lg" onClick={()=>{this.onClick()}}>Thanh toán</Button></Link>
                            </Col> */}
                            <Col>
                                <Link to="/cart" style={styles.centerButtons}><Button outline color="secondary" size="lg" onClick={()=>{this.onClick()}}>Giỏ hàng</Button></Link>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    </Fragment>
                    :
                    <></>
                }
            </ListGroup>
        );

        return (
            <>
                <div className="shopcart" onClick={()=>{this.onClick()}}>
                    <i className="fa fa-shopping-cart" style={{color: "#ffbb38", fontSize: 20, marginTop: 6}}></i>
                    <span className="text" style={{color: "#ffbb38"}}>({addedItems.length})</span>
                </div>
                <div className="single__items">
					<div className="miniproduct">
                        {Content}
                    </div>
                </div>
                
            </>
            )
        }
    }

const mapStateToProps = state => ({
    cart: state.cart,
});
    
const mapDispatchToProps = {  };
    
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MiniCart);
  