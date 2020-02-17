import React, { Component } from 'react'

export default class Recipe extends Component {
	render() {
		const {image_url,title,source_url,publisher,recipe_id} = this.props.recipe;
//the above gives us access to all variables we are to use to build the component
		const {handleDetails} = this.props;
 		return (
			<React.Fragment>
				<div className="col-10 mx-auto col-md-6 col-lg-4 my-3">
					<div className="card">
						<img src={image_url} className="img-card-top" style={{height:"14rem"}} 
							alt="recipe" />
						<div className="card-body text-capitalize">
							<h6>{title}</h6>
							<h6 className="text-warning text-slanted">
								provided by {publisher}
							</h6>
						</div>
						<div className="card-footer">
							<button type="button" className="btn btn-primary text-capitalize" 
								onClick={()=>handleDetails(0,recipe_id)}>
								details
							</button>
							<a href={source_url} className="btn bnt-success mx-2 text-capitalize" 
								target="_blank" rel="noopener noreferrer">
								
								{/*this opens up new tab for the link*/}
								recipe url
							</a>
						</div>
					</div>
				</div>
			</React.Fragment>

		)
	}
}


