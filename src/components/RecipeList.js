import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeSearch from './RecipeSearch'

export default class RecipeList extends Component {
	//here we need to destructure our props since they are the ones that will live in the
	//RecipeList
	//destructuring the recipes from the main data which is tempList
	render() {
		const {recipes, handleDetails,value,handleSubmit, handleChange, error} = this.props;
		return(
			<React.Fragment>
				<RecipeSearch  value={value}  handleChange={handleChange} handleSubmit={handleSubmit} />
					<div className="container my-5">
				{/*title*/}
						<div className="row">
							<div className="col-10 mx-auto col-md-6 text-center text-uppercase mb-3">
								<h1 className="text-capitalize">recipe list</h1>
							</div>
						</div>
				{/*end of title*/}
						<div className="row">
							{error?<h1 className="text-danger text-center">{error}</h1> : 
							(
								recipes.map(recipe => {
									return (
										<Recipe key={recipe.recipe_id} recipe={recipe} handleDetails={handleDetails}/>
									)
								})}
						{/*making sure that our first index is 0*/}
							)
						</div>
					</div>
			</React.Fragment>
		)
	}
}