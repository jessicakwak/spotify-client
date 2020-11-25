import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/album.css'

class Album extends React.Component {
	render() {
		const{album}=this.props
		return (
			<Link to={`/albums/${album._id}`} className="album">
				<div
					className="cover"
					style={{ backgroundImage: `url('${album.cover}')` }}
				></div>
				<h3>{album.name}</h3>
				<span>{album.artist.name}</span>
			</Link>
		)
	}
}

export default Album
