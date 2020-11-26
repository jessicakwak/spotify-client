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
			,currentSong:{
				_id:"",
				album:{},
				artist:{},
				audio:"",
				genre:{},
				name:"",
				playing:false
			},
			duration:""
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
			  },
			  onplay:()=>{
				//   console.log(this.utils.formatTime(Math.round(audio.duration())))
				  let time = this.utils.formatTime(Math.round(audio.duration()))
				  document.getElementById('duration').innerHTML = time
				  requestAnimationFrame(this.utils.updateTimeTracker.bind(this));
				  document.getElementById('playBtn').style.display="none"
				  document.getElementById('stopBtn').style.display="inline-block"
			  },
			  onseek:()=>{
				  console.log('onseek')
			  },
			  onpause:()=>{
				document.getElementById('playBtn').style.display="inline-block"
				document.getElementById('stopBtn').style.display="none"
			  }
		})
		this.setState(
			{songs:songsCopy
			,nowPlaying:audio
			,currentSong:songsCopy.filter(e=>e._id===id)[0]
			// ,duration:Math.round(audio.duration())
		},
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
				songs:songsCopy
			})
	
		}
		pause = ()=>{
			if(this.state.nowPlaying!==""){
				this.state.nowPlaying.pause();
			}
		}
		replay = ()=>{
			this.state.nowPlaying.play();
		}

utils = {
			formatTime: secs=> {
				var minutes = Math.floor(secs / 60) || 0;
				var seconds = (secs - minutes * 60) || 0;
				return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			},
			
			updateTimeTracker: ()=> {
				var self = this.state.nowPlaying;
				var seek = this.state.nowPlaying.seek() || 0;
				var currentTime = this.utils.formatTime(Math.round(seek));
		
				document.getElementById('timer').innerHTML=currentTime;
				document.getElementById('current').style.width = (((seek / self.duration()) * 100) || 0) + '%';
				
				if (self.playing()) {
					requestAnimationFrame(this.utils.updateTimeTracker.bind(self));
				}
			}
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
		const {currentSong}=this.state
		const songInfo = currentSong.name!==""? <p><strong>{currentSong.name}</strong> - {currentSong.artist.name}</p>:<p>Choose a song to play</p>
		
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
					<Route path="/artists/:id" render={(props)=>{
						return <Artist {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>}}/>
					<Route path="/artists" component={Artists} />
					<Route path="/genres/:id" render={(props)=>{
						return <Genre {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>
					}} />
					<Route path="/genres" component={Genres} />
					<Route path="/" render={()=>{
						return <Songs song={this.state.songs} play={this.play} stop={this.stop}/>
					}}/>
					</Switch>
				</div>
				<div className="player">
					<div className="songInfo">{songInfo}</div>
					<div className="progress">
					<i className="far fa-play-circle" id="playBtn" onClick={this.replay}></i>
					<i className="far fa-pause-circle" id="stopBtn" onClick={this.pause}></i><br/>
						<span id="timer">0:00 </span>
					<div className="progressBar"><div id="current"></div></div>
					<span id="duration">0:00 </span> 	</div>				
				</div>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
