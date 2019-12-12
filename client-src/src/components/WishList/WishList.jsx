import React, { Component } from 'react';
import './WishList.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getWishList, removeBookWishList } from '../../actions/book.action';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
// import SweetAlert from 'react-bootstrap-sweetalert';
  
class WishList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            booksFavor: []
        };
    }

    async componentDidMount(){
        await this.props.getWishList(localStorage.userId);
        this.setState({
            ...this.state,
            booksFavor: this.props.books.books,
        })
    }

    async onRemove(bookId){
        await this.props.removeBookWishList(bookId);
        this.setState({
            ...this.state,
            booksFavor: this.props.books.books,
        })
    }

    render(){
        const { books } = this.props.books;
        const { booksFavor } = this.state;
        console.log(booksFavor)
        let Content = (booksFavor === undefined) || (booksFavor.length === 0) ? (
            <h2>Danh sách ưa thích trống</h2>
        ) : (
            booksFavor.map((book, ) => {
                return(
                    <li class="table-row">
                        <div class="col col-1" data-label="Remove" onClick={()=>{this.onRemove(book.id)}}>x</div>
                        <div class="col col-2" data-label="Book Title">{book.title}</div>
                        <div class="col col-3" data-label="Price">${book.price}</div>
                        <div class="col col-4" data-label="Status">{book.status}</div>
                        <div class="col col-5" data-label="Payment Status"><Link to={`/books/${book.id}`} className="buyLink align-self-center w-80">Xem chi tiết</Link></div>
                    </li>
                );
            })
        )
        if (booksFavor === null){
            return (
                <SwappingSquaresSpinner/>
            );
        }
        return(
            <div class="container">
                <h2>Danh sách ưa thích</h2>
                <ul class="responsive-table">
                    <li class="table-header">
                        <div class="col col-1">Xóa</div>
                        <div class="col col-2">Tên sách</div>
                        <div class="col col-3">Giá</div>
                        <div class="col col-4">Trạng thái</div>
                        <div class="col col-5">Xem chi tiết</div>
                    </li>
                    {Content}
                </ul>
            </div>
        );
    }
}

WishList.propTypes = {
    books: PropTypes.object.isRequired,
    getWishList: PropTypes.func.isRequired,
    removeBookWishList: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    books: state.books,
});

const mapDispatchToProps = {
    getWishList,
    removeBookWishList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WishList);
  