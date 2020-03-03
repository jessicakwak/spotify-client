import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/album.css'

class Genre extends React.Component {
	render() {
		return (
			<Link to={''} className="album">
				<div
					className="cover"
					style={{ backgroundImage: `url('${this.props.genre.cover}')` }}
				></div>
				<h3>{this.props.genre.name}</h3>
			</Link>
		)
	}
}

export default Genre
