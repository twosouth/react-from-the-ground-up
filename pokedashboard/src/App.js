import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 50,
      totalPages: 0,  
      count: 0,
      loaded: false,
      showModal: false
    };

    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  handlePaginationSelect(page) {
    console.log("page: " + page);
    
    let offset = this.state.limit * page;
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: page
    })
  }


  loadPokemon(url) {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        let pages = Math.round(json.count / this.state.limit)
        this.setState({
          pokemon: json.results,
          totalPages: pages,
          count: json.count,
          loaded: true
        })      
      })
      .catch(err => {
        console.log(err);        
      })
  }

  componentWillMount() {
    this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
  }

  handleLimitChange(event) {
    this.setState({
      limit: +event.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {  // this is a callback
      this.loadPokemon(`${this.props.baseUrl}/pokemon/?limit=${this.state.limit}&offset=0`);
    })
  }

  toggleModal() {
    this.setState({
      showModal: true
    })
    
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pokemon Dashboard by CodeWithTim.com</h1>
        </header>

      {this.state.loaded ? null :  "Loading..."}
      <PokemonIndexList
        display={this.state.loaded}
        options={[10, 50, 100, 200]}
        selectedValue={this.state.limit}
        allValue={this.state.count}
        onOptionSelected={this.handleLimitChange}
        listOfPokemon={this.state.pokemon}
        bsSize="small"
        items={this.state.totalPages}
        activePage={this.state.activePage}
        onSelect={this.handlePaginationSelect}
        totalPages={this.state.totalPages}
      />

      <PokemonModal 
        toggleModal={this.toggleModal} 
        showModal={this.state.showModal} 
      />

      </div>
    );
  }
}

export default App;
