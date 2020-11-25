import React from 'react'
import axios from 'axios'
import { Howl } from 'howler'
import Sidebar from '../components/Sidebar'
import Song from '../components/Song'
import '../styles/songs.css'

class Songs extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			songs: []
			,nowPlaying:{}
		}
	}
play = audio=>{
	this.setState({
		nowPlaying:audio
	},()=>{
		this.state.nowPlaying.play()
	})
}
	
	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/songs`)
			.then(res => {
				this.setState({songs:res.data
					// ,
					// nowPlaying:audio
				})
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
						<thead>
							<tr>
								<th></th>
								<th>Name</th><th>Artist</th><th>Album</th><th>Genre</th>
							</tr>
						</thead>
						<tbody>{this.state.songs.map((s,i)=>{
							return <Song song={s} key={i} play={this.play}
							 />
						}
						)}</tbody>
						
					</table>
				</div>
			</div>
		)
	}
}

export default Songs
