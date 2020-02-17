import React, { Component } from 'react';
import './App.css';
import {recipes} from './tempList';
import  RecipeList  from './components/RecipeList';
import  RecipeDetails from './components/RecipeDetails';


export default class App extends Component {
  state = {
/*since we dont want to exceep the max calls per day we rule out */
    recipes:recipes,
    url:"http://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada",
    base_url:"http://www.food2fork.com/api/search?key=b6fb5d86fb9419eeec1129a9e77a1ada",
    details_id:35380,
    /*the above is the url with key for searching the recipes*/
    pageIndex: 1, {/*we need this index since its used to display what cpt*/}
    search:'',
    query: "&q=", {/*this is based on the documentation of food2fork API*/}
    error:"",
  };

async getRecipes(){ {/*async await helps us write our code like we would be perfoerming asynchronously*/}
  try{
    const data = await fetch(this.state.url); {/*since here we wanna access the url*/}
    {/*since data is not in json format we need to put it to json*/}
    {/*so this literally means that get me the data transfer it into json format and then get me the jsonData*/}
    const jsonData = await  data.json();{/*grabbing the json data here*/}

    console.log(jsonData);{/*wen we do this we get the json object */}
{/*we do conditional rendering to handle case where user types what doesnot exist*/}
    if (jsonData.recipes.length === 0){
      this.setState(()=> {
        return {error:"sorry, but your search did not return any results"}
      })
    } else {
      this.setState(()=>{
        return {recipes:jsonData.recipes}
      })
    }
  }catch(error){
    console.log(error)
  } 
}
componentDidMount(){
  this.getRecipes()
}

displayPage = (index) => {
  switch(index) {
{/*switch is useful case of multiple components forexample if we have about 10 cases*/}
    default:
      case 1:
        return (<RecipeList recipes={this.state.recipes} 
                   handleDetails={this.handleDetails} 
                   value={this.state.search}   {/*we are pulling the search from the state so we use value*/}
                   handleChange={this.handleChange} 
                   handleSubmit={this.handleSubmit} 
                   error={this.state.error} 
                />)
      {/*passed down the recipes from the state to recipeList*/}
      case 0:
        return (<RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />)
         {/*since each has aunique id*/}
  }
};
  handleIndex = index => {
    this.setState({
      pageIndex:index
    })
  };
  handleDetails =  (index, id) => {
    this.setState({
      pageIndex:index,
      details_id: id
    })
  };
{/*function to handle the changing value in the search component*/}
  handleChange = (e) => {
    this.setState({
      search:e.target.value
    },()=> {
      console.log(this.state.search);
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const {base_url,query,search} =  this.state;{/*use state since u are grabbing values from the state*/}
    this.setState(()=>{
      return {url:`${base_url}${query}${search}`, search:""} {/*here changing url to our new search url*/}
    },() => {
      this.getRecipes();
    })
  }
  {/*we use base_url instead of url since base_url doesnot change its constant, but its the url that changes
  */}
  render(){
    //console.log(this.state.recipes);
    return (
      <React.Fragment>
{/* we are passing the pageIndex as aprop to the pageIndex in the component*/}
        {this.displayPage(this.state.pageIndex)}
      </React.Fragment>
    )
  }
 
}

