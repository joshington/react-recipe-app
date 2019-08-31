import React, { Component } from 'react';
import './App.css';
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import  {recipes}  from './tempList';
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'


class App extends Component {
  state = {
  	recipes: recipes,
  	url: 
  	 "https://www.food2fork.com/api/search?key=bdf92e170853cd11b8dcab871c6748f5",
  	base_url: "https://www.food2fork.com/api/search?key=bdf92e170853cd11b8dcab871c6748f5",
  	details_id:35375,
  	pageIndex: 1,
  	search: '',
  	query: '&q=',
  	error: '',
  };
//{/*when handling the asynchronous mode we have to use the async keyword.*/}
  async getRecipes(){
  	try{
  		const data = await fetch(this.state.url);
 		const jsonData = await data.json();
  		console.log(jsonData);

  		if (jsonData.recipes.length === 0){
  			this.setState(() => {
  				return {error:'sorry, but your search did not return any results'}
  			})
  		}
  		else {
  			this.setState(() => {
  				return {recipes:jsonData.recipes}
  			})
  		}
  	} catch (error) {
  		console.log(error)
  	}
  }

//{/*cptDidMount lifecylce rus when the component renders*/}
  componentDidMount() {
  	this.getRecipes()
  }

  displayPage = index => {
  	switch (index) {
  		default:
  		case 1:
  			return (
  				<RecipeList 
  					recipes={this.state.recipes} 
  					handleDetails={this.handleDetails}
  					value={this.state.search}
  					handleChange={this.handleChange}
  					handleSubmit={this.handleSubmit}
  					error={this.state.error}
  				/>
  			);
  		case 0:
  			return <RecipeDetails  id={this.state.details_id} 
  			handleIndex={this.handleIndex} />;
//when the pageIndex is 0 the RecipeDetails will be the one called
//otherwise for case1 its other recipes that will be called
  	}
  };

  handleIndex  = index => {
  	this.setState({
  		pageIndex:  index

  	})
  }
  handleDetails = (index, id) => {
  	this.setState({
  		pageIndex: index,
  		details_id: id
  	});
  };

  handleChange = (e) => {
  	this.setState({
  		search:e.target.value
  	},() => {
  		console.log(this.state.search)
  	})
  }
  handleSubmit = (e) => {
  	e.preventDefault();
  	const {base_url, query,search} = this.state;

  	this.setState(() => {
  		return {url: `${base_url}${query}${search}`, search:""}
  	},() => {
  		this.getRecipes();
  	})
  }

  render() {
  	//console.log(this.state.recipes);

    return (
      	<React.Fragment>{this.displayPage(this.state.pageIndex)}
      	</React.Fragment>
    );
  }
 
}
export default App;
