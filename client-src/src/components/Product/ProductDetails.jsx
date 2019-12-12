import React, { Component } from 'react';
import TextInputAuth from '../../HOC/TextInputAuth'
import './ProductDetails.scss';
import { Link, withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cart.action'
import { getBookById, addToWishList, getWishList } from '../../actions/book.action';
import { getCommentByIdBook } from '../../actions/comment.action'
import { postComment } from '../../actions/comment.action'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
import Button from '../common/Button';
import Rating from '@material-ui/lab/Rating'
import { ratingBook, getRatingBook, getRatingBookUser } from '../../actions/rating.action'
import Comment from '../Product/Comment'
class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
			bookId: this.props.match.params.id,
			quantity: 1,
			isLoading: false,
			value_rating: 0,
			isAdded: false
		}
	}

	setValue(value) {
		this.setState({value_rating: value})
	}

    componentWillMount() {		
	this.props.getBookById(this.state.bookId);
	}

	async componentDidMount() {
		await this.props.getRatingBook(this.state.bookId)
		await this.props.getWishList(localStorage.userId)
		await this.props.getRatingBookUser(this.state.bookId, localStorage.userId)
		let temp = this.props.books.books;
		let a = temp.find(x=>x.id===this.props.match.params.id)
		if (a !== undefined){
			this.setState({
				isAdded: true,
			})
		}
	}
	
	onSetState(quantity){
		if (quantity > 0 || quantity === ''){
			this.setState({
				...this.state,
				quantity: quantity,
			})
		}
	}

	async onAddToWishList(bookId, userId){
		await this.props.addToWishList(bookId, userId);
		this.setState({
			...this.state,
			isAdded: true
		})
	}

	handleClick = (productId, quantity, currentQuantity)=>{
		if (quantity === ""){
			quantity = 0;
		}
		let productData =  {
			productId: productId,
			quantity: parseInt(quantity),
			currentQuantity: currentQuantity,
		};
		this.props.addToCart(productData);
		
	}

	rating (bookId, value) {
		let details = {
			bookId : bookId,
			rate : parseInt(value)
		}
		this.props.ratingBook(details)

	}

  render() {
		const { book, loading } = this.props.books;
		const {rating, rating_user} = this.props.ratings
		const {isAuthenticated} = this.props.auth
		console.log(isAuthenticated)
		const rate = isAuthenticated ? (<Rating
			name="simple-controlled"
			value={rating_user.rate}
			onChange={(event, newValue) =>
				{
					this.setValue(newValue)
					this.rating(this.state.bookId,newValue)
				}
			}
			/>) : (<h6>Bạn cần <Link to="/login" style={{color: 'red'}}>ĐĂNG NHẬP</Link> để đánh giá sản phẩm này</h6>)
		let error  = this.props.cart.error;
		let enable = book === null ? (
			<></>
		) : (
			book.enable
			// false
			// true
		)
		let Content = loading || book === null ? (
        <></>
      ) : (
			book
		)
		const added = this.props.cart.addedItems;
		let existedItem = added.find(item=> this.state.bookId === item[0].id); 
		let currentQuantity;
		if (existedItem !== undefined) {
			currentQuantity = existedItem[0].quantity
		} else {
			currentQuantity = 0
		}
		let addToWishList = this.state.isAdded === false ? (
			<a className="wishlist" onClick={()=>this.onAddToWishList(this.props.match.params.id, localStorage.userId)}></a>
		) : (
			<a className="wishlist" onClick={()=>this.onAddToWishList(this.props.match.params.id, localStorage.userId)} style={{backgroundColor: "#f8cb00"}}></a>
		)
		let addToCart = enable === true ? (
			<>
				<span>Số lượng</span>
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
					</Button>
				</div>
			</>
		) : (
			<>
				<h6>Sản phẩm này chưa kinh doanh</h6>
				<div style={{width: 20}}></div>
			</>
		)
		if (book === null){
			return (
				<SwappingSquaresSpinner/>
			)
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
								<Rating
								name="read-only"
								value={rating}
								readOnly
								/>
							</div>
							<div className="price-box">
								<span>${Content.price}</span>
							</div>
							<div className="box-tocart d-flex">
								{addToCart}
								<div className="product-addto-links clearfix">
									{addToWishList}
									{/* <a className="wishlist" onClick={()=>this.onAddToWishList(this.props.match.params.id, localStorage.userId)}></a> */}
									{/* <a className="compare" href="#"></a> */}
								</div>
							</div>
							<div className="product_meta">
								<p className="posted_in">Thể loại: {Content.genres}
								</p>
							</div>
							<div className="product_meta">
								<p className="posted_in">Phát hành: {Content.publisher}
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
									<p>{Content.description}</p>
						</div>
					</div>
				</div>
				<div style={{ height: 50 }}></div>
			</div>
			<div className="product__info__detailed">
				<div className="pro_details_nav nav justify-content-start" role="tablist">
					<a className="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Đánh giá</a>
				</div>
				<div className="tab__container">
					<div className="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
						<div className="description__attribute">
							{rate}
						</div>
					</div>
				</div>
				<div style={{ height: 50 }}></div>
			</div>
			<Comment bookId={this.state.bookId} />
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
	comments: PropTypes.object.isRequired,
	getCommentByIdBook: PropTypes.func.isRequired,
	postComment: PropTypes.func.isRequired,
	ratingBook: PropTypes.func.isRequired,
	addToWishList: PropTypes.func.isRequired,
	getWishList: PropTypes.func.isRequired,
	getRatingBook: PropTypes.func.isRequired,
	getRatingBookUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	books: state.books,
	cart: state.cart,
	comments: state.comments,
	ratings: state.ratings,
	auth: state.auth
});
  
const mapDispatchToProps = {
	getBookById,
	addToCart,
	getCommentByIdBook,
	postComment,
	ratingBook,
	addToWishList,
	getWishList,
	getRatingBook,
	getRatingBookUser
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(withRouter(Product));