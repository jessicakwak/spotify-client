import React from 'react'
import axios from 'axios'
import '../styles/albums.css'
import Album from '../components/Album'

class Albums extends React.Component {
	state = {
		albums: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/albums`)
			.then(res => {
				this.setState({albums:res.data})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		return (
				<div id="albums">
					{this.state.albums.map(album => {
						return <Album album={album} />
					})}
				</div>
		)
	}
}

export default Albums
