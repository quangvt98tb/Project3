import React, { Component} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Col, Row } from 'reactstrap';
import './MiniProfile.scss';
import { logoutUser } from '../../actions/auth.action';

const styles = {
    fontSize: {
      fontSize: '13px'
    },
    centerButtons: {
      display:'flex',
      justifyContent: 'center',
      margin: '10px',
      textDecoration: 'none'
    }
  };

class MiniProfile extends Component {
    constructor(props){
      super(props);

      this.state = {
          isVisible: false
      }
    }
    onLogoutClick(e) {
        e.preventDefault();
        // this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    onClick() {
        let vis = this.state.isVisible;
        this.setState({
            ...this.state,
            isVisible: !vis
        })
    }
  
    render() {
        const { isVisible } = this.state;
        let Content = (!isVisible) ? (
            <></>
        ) : (
            <ListGroup className="list-group-abcd">
                <ListGroupItem>
                    <Row>
                        <Col>
                            <Link to="/profile" style={styles.centerButtons}><Button outline color="secondary" size="lg" onClick={()=>{this.onClick()}}>Xem tài khoản</Button></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/changepassword" style={styles.centerButtons}><Button outline color="secondary" size="lg" onClick={()=>{this.onClick()}}>Đổi mật khẩu</Button></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/wishlist" style={styles.centerButtons}><Button outline color="secondary" size="lg" onClick={()=>{this.onClick()}}>Danh sách ưa thích</Button></Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-flex justify-content-center"><Button onClick={e => this.onLogoutClick(e)}>ĐĂNG XUẤT</Button></div>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        );

        return (
            <>
                <div className="shopcart" onClick={()=>{this.onClick()}}>
                    <i className="far fa-user" style={{color: "#ffbb38", fontSize: 20, marginTop: 6}}></i>
                </div>
                <div className="single__items">
					<div className="miniproduct">
                        {Content}
                    </div>
                </div>    
            </>
            )
        }
    }
    
const mapStateToProps = state => ({
});
    
const mapDispatchToProps = { logoutUser };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MiniProfile);;
  