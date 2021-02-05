import React from 'react'
import Paper from './Paper'
import Terminal from './Terminal'
import md5 from 'md5'
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'terminal',
      isLoggedIn: false,
      user: null};
    this.toggleModes = this.toggleModes.bind(this)
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)

    this.auth = this.auth.bind(this)

  }

  componentDidMount(){
   this.auth()
  }

  logIn = async(resData) =>{

      let expiration = new Date();
      expiration.setMonth(expiration.getMonth()+1);

      cookies.set('token', resData.token, {
          path: "/",
          expires: expiration
      })

      this.auth()
  }
  auth(){
    axios.get('/user/info', {
      headers: {
          token: cookies.get('token'),
      }
    })
    .then(res => {
        this.setState({
            ...this.state,
            isLoggedIn: true,
            user: res.data.name
          })

    })
    .catch(error => {
        this.setState({
            isLoggedIn: false})
    })
  }


  toggleModes(){
    if(this.state.mode === "paper"){
      this.setState({
        ...this.state ,
        mode: 'terminal'})
    }else{
      this.setState({
        ...this.state ,
        mode: 'paper'})
    }
  }

  logOut(){
    this.setState({
      ...this.state,
      isLoggedIn: false,
      user: null
    })
    cookies.remove('token', { path: '/' })

  }

  render() {

    return (
      <>
        <style>{"#"  + this.state.mode + "{display: block;}"}</style>
        <button onClick={this.toggleModes}>Mode</button>
          <Paper /> 
          <Terminal logIn={this.logIn} logOut={this.logOut} user={this.state.user} isLoggedIn={this.state.isLoggedIn}/>
      </>
    )
  }
}