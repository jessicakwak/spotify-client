import React from 'react'
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

	static getDerivedStateFromProps(props,state){
		if(props.song!=state.songs){
			return{songs:props.song}
		}
		return  null
	}

	render() {
		return (
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
							play={this.props.play}
							stop={this.props.stop}
							 />
						}
						)}</tbody>
						
					</table>
				</div>
		)
	}
}

export default Songs
