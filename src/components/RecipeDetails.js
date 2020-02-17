import React, { Component } from 'react'
import {recipe} from '../tempDetails';

export default class RecipeDetails extends Component {
{/*u can have the state in the constructor if u need to pass the props to the component,getting them from
component we are extending from*/}
	//constructor(props){
	//	super(props)
	//	this.state = {
	//		recipe:recipe,
	//		url	:`https://www.food2fork.com/api/get?key=b6fb5d86fb9419eeec1129a9e77a1ada&rId=${this.props.id}`
	//	}
	//}
{/*everytime u use the await keyword u have to attribute it with async mode*/}
	//async componentDidMount(){
	//	try {
	//		const data = await fetch(this.state.url);
	//		const jsonData = await data.json();

{/*u should note that when u have this.setState function u have access to the callback function*/}
	//		this.setState({
	//			recipe:jsonData.recipe{/*since now the recipes is jsonData*/}
	//		});
	//	} catch (error) {
	//		console.log(error);
	//	}
	//}
	state = {
		recipe:recipe
	}
	async componentDidMount(){
		{/*this time setting the asynchronous mode when the component renders*/}
		const id = this.props.id;
		const url = `https://www.food2fork.com/api/get?key=b6fb5d86fb9419eeec1129a9e77a1ada&rId=${this.props.id}`

		try {
{/*for this case we just need the url const since its the variable holding the information*/}
			const data = await fetch(url);
			const jsonData = await data.json();

{/*u should note that when u have this.setState function u have access to the callback function*/}
{/*this.setState here has access to the state passed down to the cpt and the props*/}
			this.setState((state, props) => {
				return {recipe:jsonData.recipe}
{/*we need the callback function because this.setState is asynchronous*/}
			},() => {

			});
		} catch (error) {
			console.log(error);
		}
	}
	render(){
{/*destructuring the props in the state to obtain the variables*/}
		const{image_url,publisher, publisher_url,source_url,title,ingredients} = this.state.recipe;
		const{handleIndex} = this.props
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<div className="col-10 mx-auto col-md-6 my-3">
							<button type="button" className="btn btn-warning mb-5 text-capitalize"
								onClick={()=>this.handleIndex(1)}>
								back to recipe list
							</button>
							<img src={image_url} alt="recipe" className="d-block w-100" />
						</div>
					{/*details section*/}
						<div className="col-10 mx-auto col-md-6 my-3">
							<h6 className="text-uppercase">{title}</h6>
							<h6 className="text-warning text-capitalize text-slanted">
								provided by {publisher}
							</h6>
							<a href={publisher_url} target="_blank" rel="noopener noreferrer" 
								className="btn btn-primary mt-2 text-capitalize">
								publisher webpage
							</a>
							<a href={source_url} target="_blank" rel="noopener noreferrer" 
								className="btn btn-success mt-2 mx-3 text-capitalize">
								recipe url
							</a>
							<ul className="list-group mt-4">
								<h2 className="mt-3 mb-4">Ingredients</h2>
								{
									ingredients.map((item,index)=>{
	{/*in the map function u need to use akey that wont change for this case use the index*/}
										return (
											<li key={index} className="list-group-item text-slanted">
												{item}
											</li>
										)
									})
								}
							</ul>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

{/*for the case of key in the map function dont use something that is gonna change all the time*/}