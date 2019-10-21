import React, { Component } from 'react';
import axios from 'axios'
import './ProductDetails.scss';
import { addToCart } from '../../actions/cart.action'
import { getBookById } from '../../actions/book.action';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
			bookId: this.props.match.params.id,
			quantity: 0,
    }
	}
	
  componentWillMount() {		
		this.props.getBookById(this.state.bookId);
	}

	handleClick = (id, quantity)=>{
		this.props.addToCart(id, quantity)
	}

  render() {
		const { book, loading } = this.props.books;
		let Content =
      loading || book === null ? (
        <SwappingSquaresSpinner />
      ) : (
			book
			)
	let genres = 
		loading || book === null ? (
			<SwappingSquaresSpinner/>
		) : (
			book.genre.split("|").join(", ")
		)
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
							{/* <div className="product__overview">
								<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.</p>
								<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. </p>
							</div> */}
							<div className="box-tocart d-flex">
								<span>Quantity</span>
								<input className="input-text" id="qty" value={this.state.quantity} onChange={event => this.setState({quantity: event.target.value.replace(/\D/,'')})}/>
								<div className="addtocart__actions">
									<button className="tocart" type="submit" title="Add to Cart" onClick={()=>{this.handleClick(this.state.bookId, this.state.quantity)}}>Add to Cart</button>
								</div>
								<div className="product-addto-links clearfix">
									<a className="wishlist" href="#"></a>
									<a className="compare" href="#"></a>
								</div>
							</div>
							<div className="product_meta">
								<p className="posted_in">Genres: {genres}
								</p>
							</div>
							<div className="product-share">
								<ul>
									<li className="categories-title">Share :</li>
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
					<a className="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Details</a>
				</div>
				<div className="tab__container">
					<div className="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
						<div className="description__attribute">
							<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.</p>
							{/* <ul>
								<li>• Two-tone gray heather hoodie.</li>
								<li>• Drawstring-adjustable hood. </li>
								<li>• Machine wash/dry.</li>
							</ul> */}
						</div>
					</div>
				</div>
				<div style={{ height: 50 }}></div>
			</div>
			</div>
			</>
    )};
}


Product.propTypes = {
	books: PropTypes.object.isRequired,
	getBookById: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	books: state.books,
});
  
const mapDispatchToProps = {
	getBookById,
	addToCart,
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(Product);
// export default Product;