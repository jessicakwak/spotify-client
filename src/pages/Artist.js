import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'

import Sidebar from '../components/Sidebar'
import Song from '../components/Song'

class Artist extends React.Component {
	state = {
		artist: {},
		songs: []
	}
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/artists/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					artist: res.data,
					songs: this.props.songs.filter(e=>e.artist._id===res.data._id)
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		const {artist, songs}=this.state
		return (

				<div id="album">
					<div className="album">
						<div
							className="cover"
							style={{ backgroundImage: `url('${this.state.artist.cover}')` }}
						></div>
						<div className="info">
							<h2>{this.state.artist.name}</h2>
						</div>
					</div>
					<div id="songs">
						<table>
							<tbody>
							{songs.map((s,i)=>{
								return <Song song={s} key={i} play={this.props.play} stop={this.props.stop}/>
							})}
							</tbody>
						</table>
					</div>
				</div>

		)
	}
}

export default Artist
