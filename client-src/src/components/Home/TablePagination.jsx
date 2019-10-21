import Product from '../Product/ProductCard'
import React, { Component } from "react";
import { Container, Row, Col, CardGroup, CardDeck} from 'reactstrap';
import PaginationDeck from './Pagination'
 
class TableP extends Component {
  state = { allBooks: [], currentBooks: [], currentPage: null, totalPages: null }

  makeHttpRequestWithPage = async pageNumber => {
    let response = await fetch(`http://localhost:3000/api/books`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      allBooks: data
    });
  }
  
  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }

  onPageChanged = data => {
    const { allBooks } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentBooks = allBooks.slice(offset, offset + pageLimit);

    this.setState({ currentPage, currentBooks, totalPages });
  }

  render() {
    const { allBooks, currentBooks, currentPage, totalPages } = this.state;
    const totalBooks = allBooks.length;

    if (totalBooks === 0) return null;
    return (
          <div className="container">
            <Container>
           <Row>
           <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
           { currentBooks.map(book => 
          <Col xs="6" md="4" xl="3" className="mb-3">
             <Product key={book.id} item={book}
            />
          </Col>) }
           </CardDeck>
           </Row>
         </Container>
         <div style={{ height: 30 }}></div>
          <PaginationDeck totalRecords={totalBooks} pageLimit={8} pageNeighbours={1} onPageChanged={this.onPageChanged} />
          <div style={{ height: 50 }}></div>
          </div>
    );
  }
}

export default TableP
