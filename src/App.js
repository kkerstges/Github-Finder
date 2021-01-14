import './App.css';
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';
import PropTypes from 'prop-types'


class App extends Component {

  state = {
    users: [],
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired
  }
  
  // Search GitHub users
  searchUsers = async searchTerm => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&client_id=${
      process.env.REACT_APP_GITHUB_CLIENT_ID
    }&client_secret=${
      process.env.REACT_APP_GITHUB_CLIENT_SECRET
    }`);
    this.setState({users: res.data.items, loading: false});
  }

  render () {
    return (
      <nav className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers}/>
          <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </nav>
    );
  }
}

export default App;
