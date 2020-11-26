import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import Artist from '../components/Artist'

class Albums extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			artists: []
		}
	}
	
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/artists`)
			.then(res => {
				this.setState({
					artists:res.data
				})
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
