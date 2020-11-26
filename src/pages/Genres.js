import React from 'react'
import axios from 'axios'

import '../styles/albums.css'

import Genre from '../components/Genre'

class Genres extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			genres: []
		}
	}
	
	
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/genres`)
			.then(res => {
				this.setState({
					genres: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
				<div id="albums">
					{this.state.genres.map(genre => {
						return <Genre genre={genre} key={genre.id} />
					})}
				</div>
		)
	}
}

export default Genres
