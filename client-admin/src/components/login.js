import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Home from '../layout/home'
import axios from 'axios'

import './Login.css';

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(null)
  const [text, setText] = useState('')
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitLogin()
  }

  async function submitLogin () {
    axios.post('http://localhost:3000/api/Admins/login', {
      email: email,
      password: password
    })
    .then(function (response) {
      localStorage.setItem('id', response.data.id)
      localStorage.setItem('userId', response.data.userId)
      setId(localStorage.getItem('id'))
    })
    .catch(function (error) {
      if(email === '' || password === ''){
        setText('Bạn chưa điền đủ thông tin!')
      }
      else {
        setText('Sai tên tài khoản hoặc mật khẩu!')
      }
    });
  }

  if(id === null){
  return (
    // <div className="Login" style={{backgroundColor: '#77C35E'}}>
    //   <form onSubmit={handleSubmit} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 20}}>
    //     <FormGroup controlId="email" bsSize="large" style={{height: 50, paddingLeft: 80}}>
    //       <text style={{fontWeight: 'bold'}}>Email: </text>
    //       <br/>
    //       <FormControl
    //         autoFocus
    //         type="email"
    //         value={email}
    //         onChange={e => setEmail(e.target.value)}
    //         style={{height:25, borderRadius: 5, marginTop: 5}}
    //       />
    //     </FormGroup>
    //     <br/>
    //     <FormGroup controlId="password" bsSize="large" style={{height: 50, paddingLeft: 80}}>
    //       <text style={{fontWeight: 'bold'}}>Mật khẩu:</text>
    //       <br/>
    //       <FormControl
    //         value={password}
    //         onChange={e => setPassword(e.target.value)}
    //         type="password"
    //         style={{height:25, borderRadius: 5, marginTop: 5}}
    //       />
    //     </FormGroup>
    //     <br/>
    //     <text style={{fontSize: 15, marginLeft: 55}}>{text}</text>
    //     <br/>
    //     <br/>
    //     <Button block bsSize="large" disabled={!validateForm()} type="submit" style={{marginLeft: 120, marginBottom: 10, height: 30, width: 90, backgroundColor: '#ff4', borderRadius: 5}}>
    //       Đăng nhập
    //     </Button>
    //   </form>
    // </div>
    <div class="wrapper fadeInDown">
  <div id="formContent">
    <h2 class="active"> Đăng nhập </h2>
    <div class="fadeIn first">
    <text style={{fontSize: 15}}>{text}</text>
    </div>
    <form onSubmit={handleSubmit}>
      <input type="email" id="login" class="fadeIn second" name="login" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input type="password" id="password" class="fadeIn third" name="login" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" class="fadeIn fourth" value="Đăng nhập"/>
    </form>
  </div>
</div>
  );
  }
  else {
    return (<Home/>)
  }
}