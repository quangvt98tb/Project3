import React, { Component } from "react";
import { connect } from 'react-redux'
import "./Section3.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from '../Product/ProductCard'
// import ProductData from '../../data/products.json'
import { Container, Col } from 'reactstrap';
import { getAllBooks, getByGenres } from '../../actions/book.action'
import PropTypes from 'prop-types';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';

const settings2 = {
  dots: true,
  infinite: false,
  centerPadding: "50px",
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  swipeToSlide: true,
  draggable: true,
  centerMode: false,
  rows: 2,
  responsive: [
    {
    breakpoint: 768,
    settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '50px',
    slidesToShow: 2
    }
    },
    {
    breakpoint: 480,
    settings: {
    arrows: false,
    centerMode: true,
    centerPadding: '50px',
    slidesToShow: 1
    }} ]
};

class Section3 extends Component {
  componentDidMount() {
    this.props.getAllBooks(32);
  }

  onClick(genre) {
    return () => {this.props.getByGenres(genre)};
  }

  onClickAll() {
    return () => {
      this.props.getAllBooks(32);
    }
  }
  
  render(){
    const Genres = ["Tiểu thuyết", "Triết học", "Truyện ngắn", "Kinh doanh"]
    const { books, loading } = this.props.books;

    let Content =
      loading || books === null ? (
        <SwappingSquaresSpinner />
      ) : (
        books.map((productDetails,  ) => {
        return (
          <Col className="mb-3">
            <Product key={productDetails.id} item={productDetails}/>
          </Col>
        )}))
  return (
    <div>
    {/* <div style={{background: "#f6f6f6"}}> */}
    {/* <div style={{background: "https://www.sapo.vn/blog/wp-content/uploads/2017/05/sach-cover.jpg"}}> */}
    {/* <div className="container"> */}
      {/* <div style={{ height: 30 }}></div>
      <h2 className="headline">Best 
          <span class="color--theme"> Seller </span>
      </h2>
      <p className="content_p">Những cuốn sách được ưa chuộng nhất tại cửa hàng</p>
      <div className="section3">
        <Slider {...settings1}>
          {ProductData.map((productDetails, index)=>{
            return <Product key={productDetails.id} item={productDetails}
            />
          })}
        </Slider>
        <div style={{ height: 50 }}></div>
      {/* </div> */}
    {/* </div> */}
    {/* </div> */}
    <div style={{background: "#f6f6f6"}}>
    <div className="container" >
      
    <div style={{ height: 30 }}></div>
    <h2 className="headline">Tất Cả 
        <span class="color--theme"> Sách </span>
    </h2>
    <p className="content_p">Tất cả sách hiên đang được bày bán tại cửa hàng</p>
    <div className="section3">
      <Container>
				<div class="product__nav nav justify-content-center" role="tablist">
          <a class="nav-item nav-link active" data-toggle="tab" href="#nav-all" role="tab" onClick={this.onClickAll()}>TẤT CẢ</a>
          {Genres.map((genre, index) => {
            return(
              <a class="nav-item nav-link" data-toggle="tab" href="#nav-adventure" role="tab" onClick={this.onClick(genre)}>{genre}</a>
            )
          })}
        </div>
      </Container>
      <div style={{ height: 30 }}></div>
      <Container>
        <Slider {...settings2}>       
          { Content }
        </Slider>
        </Container>
			</div>
      <div style={{ height: 50 }}></div>
    </div>
  </div>
  </div>
  );
}
}

Section3.propTypes = {
  books: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  getByGenres: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = {
  getAllBooks,
  getByGenres,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Section3);
