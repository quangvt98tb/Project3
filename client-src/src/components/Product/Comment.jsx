import React, { Component } from 'react'
import './ProductDetails.scss';
import {Input} from 'reactstrap'
import Button from '../common/Button';
import { Link, withRouter } from 'react-router-dom';
import { postComment } from '../../actions/comment.action'
import { connect } from 'react-redux';
import { getCommentByIdBook } from '../../actions/comment.action'
import PropTypes from 'prop-types';
import { getBookById } from '../../actions/book.action';
import { getCurrentProfile } from '../../actions/profile.action';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';

class Details extends Component {
	render () {
		return (
			<li>
				<div>
		            <b>{this.props.name}</b>
				</div>
				<div>
		            <p>{this.props.content}</p>
				</div>
				<div>
 		            <p style={{fontSize: 10, opacity: 0.5}}>{this.props.time}</p>
 				</div>
			</li>
		)
	}
}

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
                isLoading: false,
				comments: null,
				value: ''
			}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		}

		async componentDidMount(){
			await this.props.getCommentByIdBook(this.props.bookId);
			this.setState({
				...this.state,
				comments: this.props.comments.comment
			})
			await this.props.getCurrentProfile();
		}

		handleChange(event) {
			this.setState({value: event.target.value});
		  }
		
		handleSubmit(event) {
			alert('A name was submitted: ' + this.state.value);
			event.preventDefault();
		}

		getTime() {
			var d = new Date()
			var day = d.getDate();
            var year = d.getFullYear();
            var hour = d.getHours();
            var minute = d.getMinutes();
            var month = d.getMonth()+1;
			var second = d.getSeconds();
			return(year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second )
		}

		async post (content, bookId) {
			let details = {
				content: content,
				bookId: bookId
			}
			await this.props.postComment(details);
			await this.setState({comments: this.state.comments.concat({userId: localStorage.userId, bookId: this.props.bookId, content: this.state.value, enable: false, time: this.getTime(), userName: this.props.profile.profile.fullName})})
			await this.setState({value: ''})
			await console.log(this.state.comments)
		}


    render() {
		const { book, loading } = this.props.books
		const {comments} = this.state;
		const { profile } = this.props.profile;
		const {isAuthenticated} = this.props.auth
		const Comment = isAuthenticated ? (
			<>
		<label style={{width: '85%'}}>
		  <input style={{width: '100%'}} type="longtext" value={this.state.value} onChange={this.handleChange} />
	        </label>
	          <Button style={{height: 25, width: 70}} type="submit" title="Post comment" onClick={()=> {
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
			  this.post(this.state.value, this.props.bookId)}}
			  isLoading = {this.state.isLoading}
		  >
				  Đăng
		  </Button></>) : (<h6>Bạn cần <Link to="/login" style={{color: 'red'}}>ĐĂNG NHẬP</Link> để bình luận về sản phẩm này</h6>)
		let listComments;
		if (comments !== null){
        listComments = comments.map(e => (
					<Details name={e.userName} content={e.content} time={e.time} />
				))
		} else {
			listComments = <></>
		}
		if (comments === null) {
			return (
				<SwappingSquaresSpinner/>
			)
		}
        return (
            <div className="product__info__detailed">
				<div className="pro_details_nav nav justify-content-start" role="tablist">
					<a className="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Bình luận</a>
				</div>
				<div className="tab__container">
					<div className="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
						<div className="description__attribute">
							<ul>
								{listComments}
							</ul>
							<div className="box-tocart d-flex">
                                {Comment}
							</div>
						</div>
					</div>
				</div>
				<div style={{ height: 50 }}></div>
			</div>
        )
    }
}
Comment.propTypes = {
	books: PropTypes.object.isRequired,
	comments: PropTypes.object.isRequired,
	getCommentByIdBook: PropTypes.func.isRequired,
	postComment: PropTypes.func.isRequired,
	getBookById: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,


};

const mapStateToProps = state => ({
	books: state.books,
	comments: state.comments,
	profile: state.profile,
	auth: state.auth
});
  
const mapDispatchToProps = {
	getCommentByIdBook,
	postComment,
	getBookById,
	getCurrentProfile,
};
  
export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(withRouter(Comment));