import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { Howl } from 'howler'
import './styles/global.css'
import Sidebar from './components/Sidebar'
import Songs from './pages/Songs'
import Albums from './pages/Albums'
import Album from './pages/Album'
import Artists from './pages/Artists'
import Artist from './pages/Artist'
import Genres from './pages/Genres'
import Genre from './pages/Genre'

class App extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			songs: []
			,nowPlaying:""
			,currentSong:{}
		}
	}
	play = id=>{
		if(this.state.nowPlaying!==""){
			//if there is any song playing currently
			this.state.nowPlaying.stop();
		}
		let songsCopy = this.state.songs;
		songsCopy.forEach(e=>e.playing =false);
		songsCopy.filter(e=>e._id===id)[0].playing = true

		let audio = new Howl({
			html5: true,
			src: [`${songsCopy.filter(e=>e._id===id)[0].audio}`],
			onend: ()=> {
				//play next song when this song ends
				this.play(songsCopy[songsCopy.map(e=>e._id).indexOf(id)+1]._id)
			  }
		})
		this.setState(
			{songs:songsCopy
				,nowPlaying:audio, currentSong:songsCopy.filter(e=>e._id===id)[0]},
			()=>{
			this.state.nowPlaying.play();
			})
	}
		
		stop = () =>{
			if(this.state.nowPlaying!==""){
				this.state.nowPlaying.stop();
			}
			let songsCopy = this.state.songs;
			songsCopy.forEach(e=>e.playing =false);
			this.setState({
				songs:songsCopy,
				nowPlaying:""
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
			<BrowserRouter>
			<Sidebar />
			<div className="mainPage">
				<div className="renderedPages">
				<Switch>
				<Route path="/albums/:id" render={(props)=>{
					return <Album {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>
				}}/>
					<Route path="/albums" component={Albums} />
					<Route path="/artists/:id" component={Artist} />
					<Route path="/artists" component={Artists} />
					<Route path="/genres/:id" component={Genre} />
					<Route path="/genres" component={Genres} />
					<Route path="/" render={()=>{
						return <Songs song={this.state.songs} play={this.play} stop={this.stop}/>
					}}/>
					</Switch>
				</div>
				<div className="player"><p>Currently playing {this.state.currentSong.name}</p> </div>
				
				</div>
			</BrowserRouter>
		)
	}
}

export default App
