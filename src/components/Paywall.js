import React from 'react'
import {} from 'react-stripe-elements'

import '../styles/paywall.css'

import Stripe from './Stripe'

class Paywall extends React.Component {
	render() {
		return (
			<div id="paywall" className={this.props.paywallOpen ? 'open' : ''}>
				<div id="card">
					<i
						id="close"
						className="fas fa-fw fa-times"
						onClick={() => this.props.closePaywall()}
					></i>
					<h2>Upgrade to Premium</h2>
					{/* stripe */}
				</div>
			</div>
		)
	}
}

export default Paywall
