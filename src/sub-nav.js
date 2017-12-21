import React from "react";


export class SubNav extends React.Component {
	// dropdown = () => {
	// 	console.log('d')
	// }
	render() {
		return (
			<div id="sub-nav">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<a className="nav-link dropdown-toggle" onClick={this.dropdown}>Market Cap</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<a className="dropdown-item" href="#">All</a>
									<a className="dropdown-item" href="#">Coins</a>
									<a className="dropdown-item" href="#">Tokens</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link dropdown-toggle" onClick={this.dropdown}>Trade Volume</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<a className="dropdown-item" href="#">24 Hour Volume Rankings</a>
									<a className="dropdown-item" href="#">Weekly Volume Rankings</a>
									<a className="dropdown-item" href="#">Monthly Volume Rankings</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link dropdown-toggle" onClick={this.dropdown}>Trending</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<a className="dropdown-item" href="#">Gainers and Losers</a>
									<a className="dropdown-item" href="#">Recently Added</a>
									<a className="dropdown-item" href="#">Most Recent Events</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">News</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Watchlist</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Portfolio</a>
							</li>
					    </ul>
					    <form className="form-inline my-2 my-lg-0">
					    	<input className="form-control mr-sm-2" type="search" placeholder="Search currencies" aria-label="Search" />
					    </form>
					</div>
				</nav>
			</div>
		)
	}
}
