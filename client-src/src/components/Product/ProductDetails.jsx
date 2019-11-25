import React, { Component } from 'react';
import TextInputAuth from '../../HOC/TextInputAuth'
import './ProductDetails.scss';
import { addToCart } from '../../actions/cart.action'
import { getBookById } from '../../actions/book.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
import Button from '../common/Button';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
			bookId: this.props.match.params.id,
			quantity: 1,
			isLoading: false,
		}
		// const isLoading = React.useState(false);
	}
	
  componentWillMount() {		
		this.props.getBookById(this.state.bookId);
	}
	
	onSetState(quantity){
		if (quantity > 0 || quantity === ''){
			this.setState({
				...this.state,
				quantity: quantity,
			})
		}
	}

	handleClick = (productId, quantity, currentQuantity)=>{
		if (quantity === ""){
			quantity = 0;
		}
		let productData =  {
			productId: productId,
			quantity: parseInt(quantity),
			currentQuantity: currentQuantity,
			// cartQuantity: this.props.cart.
		};
		this.props.addToCart(productData);
		
	}

  render() {
		const { book, loading } = this.props.books;
		let error  = this.props.cart.error;
		let Content =
      loading || book === null ? (
        <SwappingSquaresSpinner />
      ) : (
			book
		)
		console.log(Content)
	let genres = 
		loading || book === null ? (
			<SwappingSquaresSpinner/>
		) : (
			book.genre
		)
		const added = this.props.cart.addedItems;
		let existedItem = added.find(item=> this.state.bookId === item[0].id);
		let currentQuantity;
		if (existedItem !== undefined) {
			currentQuantity = existedItem[0].quantity
		} else {
			currentQuantity = 0
		}
    return (
      <>
			<div style={{ height: 50 }}></div>
        <div className="container">
        	<div className="wn__single__product">
        		<div className="row">
        			<div className="col-lg-6 col-12 mb-3 align-self-center">
                <img className="h-50 w-50 mx-auto d-block" src={Content.imgUrl} alt=""/>
        			</div>
        			<div className="col-lg-6 col-12">
                    	<div style={{ height: 70 }}></div>
        				<div className="product__info__main align-self-center align-middle">
        					<h1>{Content.title}</h1>
							<h6>{Content.author}</h6>
        					<div className="product-reviews-summary d-flex">
        						<ul className="rating-summary d-flex">
    								<li><i className="zmdi zmdi-star-outline"></i></li>
    								<li><i className="zmdi zmdi-star-outline"></i></li>
									<li><i className="zmdi zmdi-star-outline"></i></li>
									<li className="off"><i className="zmdi zmdi-star-outline"></i></li>
									<li className="off"><i className="zmdi zmdi-star-outline"></i></li>
								</ul>
							</div>
							<div className="price-box">
								<span>${Content.price}</span>
							</div>
							<div className="box-tocart d-flex">
								<span>Số lượng</span>
								{/* <input className="input-text" id="qty" value={this.state.quantity} type="number" max="19" min="1" onChange={event => this.onSetState(event.target.value.replace(/\D/,''))}/> */}
								<div style={{width: 100}}>
									<TextInputAuth
												id="qty"
												name="quantity"
												className="form-control form-control-lg rounded"
												type="number"
												onChange={event => this.onSetState(event.target.value.replace(/\D/,''))}
												value={this.state.quantity}
												error={error}
											/>
								</div>
								<div className="addtocart__actions">
									{/* <button className="tocart" type="submit" title="Add to Cart" onClick={()=>{ */}
									<Button className="tocart" type="submit" title="Add to Cart" onClick={()=> {
										this.setState({
											...this.state,
											isLoading: true
										});
										setTimeout(() => {
											this.setState({
												...this.state,
												isLoading: false
											});
										}, 600);
										this.handleClick(this.state.bookId, this.state.quantity, currentQuantity)}}
										isLoading = {this.state.isLoading}
									>
											Thêm vào giỏ
									{/* </button> */}
									</Button>
								</div>
								<div className="product-addto-links clearfix">
									<a className="wishlist" href="#"></a>
									<a className="compare" href="#"></a>
								</div>
							</div>
							{/* {error && <div className="invalid-feedback">{error}</div>} */}
							<div className="product_meta">
								<p className="posted_in">Thể loại: {genres}
								</p>
							</div>
							<div className="product-share">
								<ul>
									<li className="categories-title">Chia sẻ :</li>
									<li>
										<a href="#">
											<i className="icon-social-twitter icons"></i>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="icon-social-tumblr icons"></i>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="icon-social-facebook icons"></i>
										</a>
									</li>
									<li>
										<a href="#">
											<i className="icon-social-linkedin icons"></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="product__info__detailed">
				<div className="pro_details_nav nav justify-content-start" role="tablist">
					<a className="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Chi tiết</a>
				</div>
				<div className="tab__container">
					<div className="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
						<div className="description__attribute">
							<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.</p>
						</div>
					</div>
				</div>
				<div style={{ height: 50 }}></div>
			</div>
			</div>
				}
			</>
    )};
}


Product.propTypes = {
	books: PropTypes.object.isRequired,
	getBookById: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
	cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	books: state.books,
	cart: state.cart
});
  
const mapDispatchToProps = {
	getBookById,
	addToCart,
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(Product);