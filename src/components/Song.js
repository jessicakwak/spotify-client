import React from 'react'
import { Howl } from 'howler'

class Song extends React.Component {
	constructor(props) {
		super(props)
	
		this.state = {
			playing: false,
			audio: {}
		}
	}	
	componentDidMount() {
		let audio = new Howl({
			html5: true,
			src: [`${this.props.song.audio}`]
		})
		this.setState({ audio:audio })
	}
	play = () => {
			this.state.audio.play();
			this.setState({
				playing: true
			})
	}
	stop = () => {
			this.state.audio.stop();
			this.setState({
				playing: false
			})
	}
	render() {
		const {song} = this.props

		return (
			<tr className={this.state.playing ? 'playing' : ''}>
				<td>
					{!this.state.playing ? (
						<i
							className="button far fa-play-circle"
							onClick={e => this.props.play(this.state.audio)}
						></i>
					) : (
						<i
							className="button far fa-stop-circle"
							onClick={e => {}}
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
