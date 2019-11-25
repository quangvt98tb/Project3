import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Profile.scss';
import { getCurrentProfile } from '../../actions/profile.action';
import FixedInfo from './FixedInfo';
import UpdateInfo from './UpdateInfo';
// import UpdateDistrict from './UpdateDistrict';
import SwappingSquaresSpinner from '../common/SwappingSquaresSpinner';
export class Profile extends Component {

  async componentDidMount() {
    await this.props.getCurrentProfile();
    // console.log("profile", this.props.profile);
  }
  render() {
    const { profile, loading } = this.props.profile;

    let Content =
      loading || profile === null ? (
        <SwappingSquaresSpinner />
      ) : (
        <>
          <div style={{height: 30}}></div>
            <div className="container bg-white">
              <div className="tm-account bg-gray-lightest p-md-5 pt-md-4 p-3">
                <FixedInfo profile={profile} />
                <UpdateInfo profile={profile} />
              </div>
            </div>
          <div style={{height: 30}}></div>
          {/* <div className="container py-5">
            <div className="tm-account bg-white p-md-5 pt-md-4 p-3">
                <UpdateDistrict profile={profile} />
            </div>
          </div> */}
        </>
      );

    return <div className="main-page">{Content}</div>;
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getCurrentProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
