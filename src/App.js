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
			}
			,shufflePlay:false
		}
	}
	play = id=>{
		this.utils.stopAllSongs();
		let songsCopy = this.state.songs;
		songsCopy.forEach(e=>e.playing =false);
		songsCopy.filter(e=>e._id===id)[0].playing = true

		let audio = new Howl({
			html5: true,
			src: [`${songsCopy.filter(e=>e._id===id)[0].audio}`],
			onend: ()=> {
				//play next song when this song ends
				if(!this.state.shufflePlay){
					// console.log('shuffle play is off')
					this.play(songsCopy[songsCopy.map(e=>e._id).indexOf(id)+1]._id)
				}else{
					// console.log('shuffle play is on')
					this.utils.chooseRandomSong()
				}	
			  },
			  onplay:()=>{
				  let time = this.utils.formatTime(Math.round(audio.duration()))
				  document.getElementById('duration').innerHTML = time
				  requestAnimationFrame(this.utils.updateTimeTracker.bind(this));
				  document.getElementById('playBtn').style.display="none"
				  document.getElementById('stopBtn').style.display="inline-block"
				  document.getElementById('forward').style.display="inline-block"
				  document.getElementById('backward').style.display="inline-block"
			  },
			  onseek:()=>{
				let time = this.utils.formatTime(Math.round(audio.duration()))
				  document.getElementById('duration').innerHTML = time
				  requestAnimationFrame(this.utils.updateTimeTracker.bind(this));
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
		},
			()=>{
			this.state.nowPlaying.play();
			})
	}

	shuffleToggle = () =>{
		if(this.state.shufflePlay){
			this.setState({shufflePlay:false},
				()=>{
					document.getElementById("random").classList.remove("selected")
				}
				)
		}else{
			this.setState({shufflePlay:true},
				()=>{
					document.getElementById("random").classList.add("selected")
				}
				)
		}
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

	next = () =>{
		this.utils.stopAllSongs();
		let songIndex = this.state.songs.map(e=>e._id).indexOf(this.state.currentSong._id)
		if(!this.state.shufflePlay && songIndex < this.state.songs.length-1){
			//play next song
			this.play(this.state.songs[songIndex+1]._id)	
		}else if(!this.state.shufflePlay && songIndex==this.state.songs.length-1){
			//play the first song
			this.play(this.state.songs[0]._id)
		}else{
			this.utils.chooseRandomSong();
		}
		
	}

	prev = () =>{
		this.utils.stopAllSongs();
		let songIndex = this.state.songs.map(e=>e._id).indexOf(this.state.currentSong._id)
		if(!this.state.shufflePlay && songIndex !=0){
			//play next song
			this.play(this.state.songs[songIndex-1]._id)	
		}else if(!this.state.shufflePlay && songIndex==0){
			//play the first song
			this.play(this.state.songs[this.state.songs.length-1]._id)
		}else{
			this.utils.chooseRandomSong();
		}
		
	}

	getTime=e=>{
		let percentage = (e.pageX-document.getElementById("bar").offsetLeft)/document.getElementById("bar").offsetWidth
		this.state.nowPlaying.seek(this.state.nowPlaying.duration()*percentage)

		document.getElementById('current').style.width = e.pageX-document.getElementById("bar").offsetLeft

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
		},

		chooseRandomSong: ()=>{
			this.play(this.state.songs[Math.floor(Math.random()*this.state.songs.length)]._id)
		},
		stopAllSongs:()=>{
			if(this.state.nowPlaying!==""){
				//if there is any song playing currently
				this.state.nowPlaying.stop();
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
			<Sidebar/>
			<div className="mainPage">
				<div className="renderedPages">
				<Switch>
					<Route path="/albums/:id" render={(props)=><Album {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>}/>
					<Route path="/albums" component={Albums} />
					<Route path="/artists/:id" render={(props)=><Artist {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>}/>
					<Route path="/artists" component={Artists} />
					<Route path="/genres/:id" render={(props)=><Genre {...props} songs={this.state.songs} play={this.play} stop={this.stop}/>} />
					<Route path="/genres" component={Genres} />
					<Route path="/" render={()=><Songs song={this.state.songs} play={this.play} stop={this.stop}/>}/>
				</Switch>
				</div>
			<div className="player">
				<div className="songInfo">{songInfo}</div>
				<div className="progress">
				<i className="fas fa-backward" id="backward" onClick={this.prev}></i>
				<i className="far fa-play-circle" id="playBtn" onClick={this.replay}></i>
				<i className="far fa-pause-circle" id="stopBtn" onClick={this.pause}></i>
				<i className="fas fa-forward" id="forward" onClick={this.next}></i>
				<br/>
				<span id="timer">0:00 </span>
				<div className="progressBar" onClick={this.getTime} id="bar"><div id="current"></div></div>
				<span id="duration">0:00 </span>
				<i className="fas fa-random" id="random" onClick={this.shuffleToggle}></i>
				</div>				
			</div>
			</div>
			</BrowserRouter>
		)
	}
}

export default App
