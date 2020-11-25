import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'


class Genre extends React.Component {
	state = {
		genre: {},
		songs: []
	}
	componentWillMount() {
		axios
			.get('')
			.then(res => {
				this.setState({
					genre: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
		axios
			.get('')
			.then(res => {
				this.setState({
					songs: res.data
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
				<div id="album">
					<div className="album">
						<div
							className="cover"
							style={{ backgroundImage: `url('${this.state.genre.cover}')` }}
						></div>
						<div className="info">
							<h2>{this.state.genre.name}</h2>
						</div>
					</div>
					<div id="songs">
						<table>
							{/* songs */}
						</table>
					</div>
				</div>
		)
	}
}

export default Genre
