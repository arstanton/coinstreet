import React from "react";


export class Header extends React.Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<a className="navbar-brand" href="#">Coin Street</a>

					<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
						<div className="navbar-nav mr-auto mt-2 mt-lg-0">
							<div className="header-price">
								<img></img>
								<span className="navbar-text">BTC/USD</span>
							</div>
							<div className="header-price">
								<img></img>
								<span className="navbar-text">BTC/EUR</span>
							</div>
							<div className="header-price">
								<img></img>
								<span className="navbar-text">BTC Volume</span>
							</div>
							<div className="header-price">
								<img></img>
								<span className="navbar-text">Total Crypto Market Cap</span>
							</div>
						</div>
					</div>
				</nav>
			</div>
		)
	}
}

