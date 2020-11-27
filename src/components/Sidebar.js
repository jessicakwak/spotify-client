import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/sidebar.css'
import Logo from '../assets/spotifyClone.png' 

import Paywall from './Paywall'

class Sidebar extends React.Component {
	state = {
		paywallOpen: false
	}
	openPayWall = () => {
		this.setState({
			paywallOpen: true
		})
	}
	closePaywall = () => {
		this.setState({
			paywallOpen: false
		})
	}
	render() {
		return (
			<>
				<div id="sidebar">
					<h1>Spotify?</h1>
					{/* <img  src={Logo} alt="logo" className="logo"/> */}
					<ul>
						<li>
							<Link to="/" >
								<i className="fas fa-fw fa-headphones-alt"></i>
								<span>Songs</span>
							</Link>
						</li>
						<li>
							<Link to="/albums">
								<i className="fas fa-fw fa-record-vinyl"></i>
								<span>Albums</span>
							</Link>
						</li>
						<li>
							<Link to="/artists">
								<i className="fas fa-fw fa-users"></i>
								<span>Artists</span>
							</Link>
						</li>
						<li>
							<Link to="/genres">
								<i className="fas fa-fw fa-guitar"></i>
								<span>Genres</span>
							</Link>
						</li>
					</ul>
					{/* <div id="upgrade">
						<h3>Get Premium</h3>
						<p>Play unlimited music with no ads.</p>
						<button onClick={this.openPayWall}>
							<span>Upgrade Now</span>
							<i className="fas fa-fw fa-arrow-up"></i>
						</button>
					</div> */}
				</div>
				{/* <Paywall
					paywallOpen={this.state.paywallOpen}
					closePaywall={this.closePaywall}
				/> */}
			</>
		)
	}
}

export default Sidebar
