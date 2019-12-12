import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Promo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promos: this.props.promos
          };
    }

    onChange(promoId){
        this.props.getChildState(false,promoId);
    }

    render(){
  const { promos } = this.state;
  const Content = promos.map((promoDetails, index) => {
      let type;
      if (promoDetails.minus === 0){
        type = promoDetails.divide * 100;
        type = type.toString() + '%';
      } else{
          type = promoDetails.minus;
          type = '$' + type.toString();
      }
      let buttonUse = promoDetails.total === 0 ?(
        <></>
      ) : (
        <button
          type="button"
          className="btn btn-default btn-sm text-center"
          onClick={() => this.onChange(promoDetails.id)}
          >
          Dùng mã code
      </button>
      )
      return (
        <div>
          <h4 className="modal-body bg-gray-lighter fs-base">
            Khuyến mãi số{' '}
            <span>{index + 1}{' '}</span>
            <span>(còn lại:{' '}{promoDetails.total})</span>
          </h4>
          <div className="modal-body">
            <div className="row gutter-2">
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-5">Tên khuyến mãi</div>
                  <div className="col-7">
                    <strong className="text-primary">
                      {promoDetails.name}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-5">Số lượng sở hữu</div>
                  <div className="col-7">
                    <strong className="text-primary">
                      {promoDetails.count}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-5">Ngày bắt đầu</div>
                  <div className="col-7">
                    <strong className="text-primary">
                      {promoDetails.beginAt}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-5">Ngày kết thúc</div>
                  <div className="col-7">
                    <strong className="text-primary">
                      {promoDetails.endAt}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-5">Mô tả</div>
                  <div className="col-7">
                    <strong className="">
                      {promoDetails.description}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-5">Loại</div>
                  <div className="col-7">
                    <strong className="">
                      Giảm{' '}{type}
                    </strong>
                  </div>
                </div>
              </div>
              {buttonUse}
            </div>
          </div>
        </div>
      );
  })
  return (
    <div className="modal-dialog modal-lg" role="document">
      <div
        id="divResultDetailsLoan"
        className="modal-content of-hidden rounded-10 border-0"
      >
        <div className="modal-header bg-warning text-white">
          <div className="d-flex flex-wrap">
            <h3 className="modal-title mr-3">
              {' '}
              Các khuyến mãi hiện có trong cửa hàng:{' '}
            </h3>
          </div>
        </div>
        {Content}
      </div>
    </div>
  );
    }
}

Promo.propTypes = {
  post: PropTypes.object,
};

export default Promo;
