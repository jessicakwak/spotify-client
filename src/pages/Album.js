import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'

import Sidebar from '../components/Sidebar'
import Song from '../components/Song'

class Album extends React.Component {
	state = {
		album: {},
		artist:{},
		songs: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/albums/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					album: res.data,
					artist:res.data.artist
				})
			})
			.catch(err => {
				console.log({ err })
			})
		axios
			.get(`${process.env.REACT_APP_API}/songs?album=${this.props.match.params.id}`)
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
		const {album, artist, songs} = this.state
		return (
				<div id="album">
					<div className="album">
						<div
							className="cover"
							style={{ backgroundImage: `url('${this.state.album.cover}')` }}
						></div>
						<div className="info">
							<h2>{this.state.album.name}</h2>
							<span>{artist.name}</span>
						</div>
					</div>
					<div id="songs">
						<table>
							<tbody>
								{songs.map((s,i)=>{
									return <tr>
										<td></td>
										<td>{s.name}</td>
				<td>{s.artist.name}</td>
				<td>{s.album.name}</td>
				<td>{s.genre.name}</td>
									</tr>
								})}
							</tbody>
						</table>
					</div>
				</div>
		)
	}
}

export default Album
