import React from 'react'
import axios from 'axios'

import '../styles/albums.css'

import Sidebar from '../components/Sidebar'
import Album from '../components/Album'

class Albums extends React.Component {
	state = {
		albums: []
	}
	componentWillMount() {
		axios
			.get(``)
			.then(res => {
				this.setState({})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
			<div id="page">
				<Sidebar page="albums" />
				<div id="albums">
					{this.state.albums.map(album => {
						return <Album album={album} />
					})}
				</div>
			</div>
		)
	}
}

export default Albums
