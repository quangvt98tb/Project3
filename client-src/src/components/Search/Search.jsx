import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import {Container, Row, Col, Button} from 'reactstrap';
import { getAllBooks, getDataAutoComplete, searchBooks } from '../../actions/book.action';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner'
import AutoCompleteText from './AutoCompleteText';

const columns = [{
  Header: 'ID',
  accessor: 'id'
},
{
  Header: 'Tên sách',
  accessor: 'title'
},
{
  Header: 'Tác giả',
  accessor: 'author'
},
{
  Header: 'Giá',
  accessor: 'price'
},
]
 
class Search extends Component {
  constructor(props){
    super(props);

    this.state = {
      allBooks: [], 
      dataAuto: null,
      loading: false,
      bookSearch: "",
      categorySearch: "",
      authorSearch: ""
    }
  }

  async componentDidMount() {
    await this.props.getAllBooks(50);
    await this.props.getDataAutoComplete();
    this.setState({
      ...this.state,
      allBooks: this.props.books.books,
      dataAuto: this.props.books.dataAuto,
      loading: true,
    })
  }

  getChildState = (data) => {
      if (data.name === "bookSearch"){
        this.setState({
          ...this.state,
          bookSearch: data.text
      })}
      else if (data.name === "authorSearch"){
        this.setState({
          ...this.state,
          authorSearch: data.text
      })}
      else if (data.name === "categorySearch"){
        this.setState({
          ...this.state,
          categorySearch: data.text
      })}
  }

  async onSearchClick() {
    const { bookSearch, authorSearch, categorySearch } = this.state;
    const searchData={
      book: bookSearch,
      author: authorSearch,
      category: categorySearch
    }
    await this.props.searchBooks(searchData)
    this.setState({
      ...this.state,
      allBooks: this.props.books.books,
    })
  }

  render() {
    const { allBooks, dataAuto, loading } = this.state; 
    if (!loading){
      return (
        <SwappingSquaresSpinner/>
      )
    } else {
        return (
          <>
            <Container>
              <Row>
                <Col>
                    <text>Thể loại</text>
                    <AutoCompleteText name="categorySearch" items={dataAuto.category} value="" getChildState={this.getChildState}/>
                </Col>
                <Col>
                    <text>Tên sách:</text>
                    <AutoCompleteText name="bookSearch" items={dataAuto.book} value="" getChildState={this.getChildState}/>
                </Col>
                <Col>
                    <text>Tác giả:</text>
                    <AutoCompleteText name="authorSearch" items={dataAuto.author} value="" getChildState={this.getChildState}/>
                </Col>
              </Row>
              <Row>
                <Col>
                    <br/>
                    <Button onClick={()=>{this.onSearchClick()}}>Tìm kiếm</Button>
                </Col>
              </Row><br/>
              <Row>
                <Col>
                <ReactTable data={allBooks} columns={columns} defaultPageSize={10}
                  SubComponent={row => {
                    return (
                      <Link to={`/books/${row.row.id}`} className="align-self-center w-90" style={{fontWeight: 300}}>
                        <p className="w-90 align-self-center" href={`/books/${row.row.id}`}>
                          Xem chi tiết sách
                        </p>
                      </Link>
                    )
                  }}
                />
                </Col>
              </Row>
              <div style={{height: 40}}></div>
            </Container>    
          </>
        );
    }
  }
}

Search.propTypes = {
  books: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  getDataAutoComplete: PropTypes.func.isRequired,
  searchBooks: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  books: state.books,
});

const mapDispatchToProps = {
  getAllBooks,
  getDataAutoComplete,
  searchBooks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
