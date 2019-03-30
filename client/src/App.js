import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      users: [],  
      username: '',
      password: ''
    }
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({
      [e.target.name]: e.target.value
    });
  }

  register = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:4567/api/register', user)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        })
  }

  login = e => {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('http://localhost:4567/api/login', user)
    .then(res => {
      console.log(res);
      axios.defaults.headers.common['username'] = user.username;
      axios.defaults.headers.common['password'] = user.password;
      axios.defaults.withCredentials = true;

      this.getUserList();
    })
    .catch(err => {
      console.log(err);
    })
  }

  getUserList = userInfo => {
    axios.get('http://localhost:4567/api/users')
        .then(res => {
          console.log(res);
          this.setState({ users: res.data })
        })
        .catch(err => {
          console.log(err);
        })
  }

  componentDidMount() {
    this.getUserList();
  }

  render() {
    return (
      <div className="App">
        <form>
          <label>
            Username
          </label>

          <input type='text'
                 name='username'
                 value={this.state.username}  
                 onChange={this.handleChange}
                 placeholder='username'
                 />

          <label>
            Password
          </label>
          
          <input type='text'
                 name='password'
                 value={this.state.password}  
                 onChange={this.handleChange}
                 placeholder='password'
                 />

          <button onClick={this.login}>
            Login
          </button>

          <button onClick={this.register}>
            Register
          </button>
        </form>

        {!this.state.users.length ? undefined 
                                  : this.state.users.map(user => <p key={Math.random()}>{user.username}</p>)}
      </div>
    );
  }
}


export default App;
