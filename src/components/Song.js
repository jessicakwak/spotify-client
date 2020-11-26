import React from 'react'

class Song extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			playing: props.song.playing
		}
	}	
	static getDerivedStateFromProps(props,state){
		if(props.song.playing!==state.playing){
			return {
				playing:props.song.playing
			}
		}
		return null
	}

	render() {
		const {song} = this.props

		return (
			<tr className={this.state.playing ? 'playing' : ''}>
				<td>
					{!this.state.playing ? (
						<i
							className="button far fa-play-circle"
							onClick={e => {
								this.props.play(song._id);
							}}
						></i>
					) : (
						<i
							className="button far fa-stop-circle"
							onClick={e => {
								this.props.stop();
							}}
						></i>
					)}
				</td>
				<td>{song.name}</td>
				<td>{song.artist.name}</td> 
				<td>{song.album.name}</td>
				<td>{song.genre.name}</td>
			</tr>
		)
	}
}

export default Song
