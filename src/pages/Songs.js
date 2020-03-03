import React from 'react'
import axios from 'axios'

import '../styles/songs.css'

import Sidebar from '../components/Sidebar'
import Song from '../components/Song'

class Songs extends React.Component {
	state = {
		songs: []
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
				<Sidebar page="songs" />
				<div id="songs">
					<table>
						{/* songs */}
					</table>
				</div>
			</div>
		)
	}
}

export default Songs
