import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'

import Song from '../components/Song'

class Album extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			album: {},
			artist:{},
			songs: []
		}
	}
	
	
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/albums/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					album: res.data,
					artist:res.data.artist,
					songs:this.props.songs.filter(e=>e.album._id===res.data._id)
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
									return <Song song={s} play={this.props.play} stop={this.props.stop}/>
								})}
							</tbody>
						</table>
					</div>
				</div>
		)
	}
}

export default Album
