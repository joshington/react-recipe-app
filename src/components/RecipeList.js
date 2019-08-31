import React, { Component } from 'react'
import Recipe from './Recipe';
import RecipeSearch from './RecipeSearch'

export default class RecipeList extends Component {
	//here we need to destructure our props since they are the ones that will live in the
	//RecipeList
	render() {
		const { recipes,handleDetails,value,handleSubmit,handleChange, error } = this.props;
		
		return  (
			<React.Fragment>
				<RecipeSearch  value={value} handleChange={handleChange} 
				handleSubmit={handleSubmit} />
				<div className="container my-5">
			{/*title*/}
					<div className="row">
						<div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
							<h1 className="text-slanted">recipe list</h1>
						</div>
					</div>
			{/*end of title*/}
					<div className="row">
						{error ? (<h1 className="text-danger text-center">{error}</h1>):(recipes.map(recipe => {
								return(
									<Recipe key={recipe.recipe_id} recipe={recipe} handleDetails={handleDetails} />
	//{/*passing in 0 because the handleDetails function takes in a parameter of 0*/}
								)
							});
						};
//{/*whenever you are returning multiple components u have to use a key*/}
					</div>
				</div>
			</React.Fragment>
		)
	}
}