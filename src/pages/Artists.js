import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import Artist from '../components/Artist'

class Albums extends React.Component {
	state = {
		artists: []
	}
	componentWillMount() {
		axios
			.get('')
			.then(res => {
				this.setState({})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
				<div id="albums">
					{this.state.artists.map(artist => {
						return <Artist artist={artist} />
					})}
				</div>
		)
	}
}

export default Albums
