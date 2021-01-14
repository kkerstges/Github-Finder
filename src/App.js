import './App.css';
import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users';
import axios from 'axios'
import Search from './components/users/Search';


class App extends Component {

  state = {
    users: [],
    loading: false
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

  // Clear users from state
  clearUsers = () => this.setState({ users: [] });

  render () {

    const { users, loading } = this.state;

    return (
      <nav className='App'>
        <Navbar />
        <div className='container'>
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={ users.length > 0 } />
          <Users loading={loading} users={users}/>
        </div>
      </nav>
    );
  }
}

export default App;
