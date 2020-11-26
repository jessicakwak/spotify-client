import React from 'react'
import axios from 'axios'

import '../styles/albums.css'
import '../styles/songs.css'
import Song from '../components/Song'


class Genre extends React.Component {
	state = {
		genre: {},
		songs: []
	}
	componentWillMount() {
		axios
			.get(`${process.env.REACT_APP_API}/genres/${this.props.match.params.id}`)
			.then(res => {
				this.setState({
					genre: res.data,
					songs:this.props.songs.filter(e=>e.genre._id===res.data._id)
				})
			})
			.catch(err => {
				console.log({ err })
			})
	}
	render() {
		const {genre, songs} = this.state
		return (
				<div id="album">
					<div className="album">
						<div
							className="cover"
							style={{ backgroundImage: `url('${this.state.genre.cover}')` }}
						></div>
						<div className="info">
							<h2>{this.state.genre.name}</h2>
						</div>
					</div>
					<div id="songs">
						<table>
							<tbody>
								{songs.map((s,i)=>{
									return <Song song={s} key={i} play={this.props.play} stop={this.props.stop} />
								})}
							</tbody>
						</table>
					</div>
				</div>
		)
	}
}

export default Genre
