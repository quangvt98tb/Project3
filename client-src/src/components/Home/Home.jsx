import React, { Component } from 'react';
import Section1 from './Section1';
import Section3 from './Section3'
import TableP from './TablePagination'

export default class Home extends Component {
  render() {
    return (
      <>
        <Section1 />
        <Section3 />
        {/* <TableP/> */}
      </>
    );
  }
}
