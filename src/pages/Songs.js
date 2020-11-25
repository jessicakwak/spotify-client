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
			,nowPlaying:""
		}
	}

play = id=>{
	if(this.state.nowPlaying!==""){
		this.state.nowPlaying.stop();
	}
	let songsCopy = this.state.songs;
	songsCopy.forEach(e=>e.playing =false);
	songsCopy.filter(e=>e._id===id)[0].playing = true
	let audio = new Howl({
		html5: true,
		src: [`${songsCopy.filter(e=>e._id===id)[0].audio}`]
	})
	this.setState(
		{songs:songsCopy,nowPlaying:audio},
		()=>{
		this.state.nowPlaying.play();
		})
}
	
	stop = id =>{
		if(this.state.nowPlaying!==""){
			this.state.nowPlaying.stop();
		}
		let songsCopy = this.state.songs;
		songsCopy.forEach(e=>e.playing =false);
		this.setState({
			songs:songsCopy,
			nowPlaying:{}
		})

	}

	componentDidMount() {
		axios
			.get(`${process.env.REACT_APP_API}/songs`)
			.then(res => {
				res.data.forEach(e=>e.playing=false)
				this.setState({songs:res.data
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
							return <Song song={s} key={i} 
							play={this.play}
							stop={this.stop}
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
