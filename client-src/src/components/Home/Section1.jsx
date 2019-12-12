/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './Section1.scss';
import Background2 from '../../image/bg-img/2.jpg';
import Background3 from '../../image/bg-img/3.jpg';
import Background4 from '../../image/bg-img/4.jpg';
export default class Section1 extends Component {
  render() {
    return (
      <section className="features-area" style={{backgroundColor: "white"}}>
        <div className="container">
          <div className="row align-items-end">
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div
                className="single-features-area mb-100 wow fadeInUp"
                data-wow-delay="100ms"
              >
                <div className="section-heading">
                  <div className="line" />
                  <p>Tổng quan về</p>
                  <h3>Cửa hàng sách</h3>
                  <p>của chúng tôi</p>
                </div>
                <h6>
                Cửa hàng mong muốn đem lại những cuốn sách giá trị 1 cách dễ dàng và tiện lợi nhất đến tay người tiêu dùng
                </h6>
                <a href="#" className="btn credit-btn mt-50">
                  Khám phá ngay
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div
                className="single-features-area mb-100 wow fadeInUp"
                data-wow-delay="300ms"
              >
                <img style={{ borderRadius: 10 }} src={Background2} alt="" />
                <h5 style={{ textAlign: 'center' }}>Quan tâm tới bạn</h5>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div
                className="single-features-area mb-100 wow fadeInUp"
                data-wow-delay="500ms"
              >
                <img style={{ borderRadius: 10 }} src={Background3} alt="" />
                <h5 style={{ textAlign: 'center' }}>Giao hàng nhanh</h5>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div
                className="single-features-area mb-100 wow fadeInUp"
                data-wow-delay="700ms"
              >
                <img style={{ borderRadius: 10 }} src={Background4} alt="" />
                <h5 style={{ textAlign: 'center' }}>
                  Dễ dàng &amp; tiện lợi
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
