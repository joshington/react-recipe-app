import React, { Component } from 'react'

import axios from 'axios'
//library we are to use to fetch our api
class PostList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			posts: [],
			errorMsg: ''
		}
	}

	componentDidMount() {
		//method is executed when cpt mounts for the first time and will
		//only be executed once in the cpts life time
//get method of axios accepts the api endpt as its argument
		axios.get('http://jsonplaceholder.typicode.com/posts1')
//axios is a promised based library
			.then(response => {
				console.log(response)
				this.setState({posts: response.data})
			})
			.catch(error => {
				console.log(error)
				this.setState({errorMsg: 'Error retrieving data'})
			})

	}
	render() {
		const { posts, errorMsg } = this.state
{/*when state is changed the component will re-render and this time the array is 
not empty*/}
		return (
			<div>
				List of posts
				{/*/first the list is empty, after it proceeds to the cptdidmount
				//which talks to the endpoint*/}
				{
					posts.length ?
					posts.map(post => <div key={post.id}>{post.title}</div>) :
					null
				}
				{ errorMsg ? <div>{errorMsg}</div>: null}
			</div>
		)
	}
}

export default PostList


//hooks can as well e used to fetch data
//but its better to first master http requests