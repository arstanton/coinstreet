import React from "react";

export class SubNav extends React.Component {
	componentDidMount() {
		document.addEventListener('click', this.handleOutsideClick);
	}
	componentWillUnmount() {
		document.removeEventListener('click', null);
	}
	state = {
		marketCap: false,
		tradeVolume: false,
		trending: false
	}
	handleClick = (e) => {
		for (let prop in this.state) {
			if (prop === e) {
				this.setState({ 
					[e]: !this.state[e]
				});
			} else {
				this.setState({ 
					[prop]: false
				});
			}
		}
	}
	handleOutsideClick = (e) => {
		if (this.subnav.contains(e.target) && e.target.name) {
			return this.handleClick(e.target.name) 
		}
		this.setState({
			marketCap: false,
			tradeVolume: false,
			trending: false
		});
	}

	render() {
		return (
			<div id="sub-nav" ref={ subnav => { this.subnav = subnav; } }>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" name="marketCap">Market Cap</a>
								<div className={this.state.marketCap ? 'show dropdown-menu' : 'dropdown-menu'}>
									<a className="dropdown-item" href="#">All</a>
									<a className="dropdown-item" href="#">Coins</a>
									<a className="dropdown-item" href="#">Tokens</a>
								</div>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" name="tradeVolume">Trade Volume</a>
								<div className={this.state.tradeVolume ? 'show dropdown-menu' : 'dropdown-menu'}>
									<a className="dropdown-item" href="#">24 Hour Volume Rankings</a>
									<a className="dropdown-item" href="#">Weekly Volume Rankings</a>
									<a className="dropdown-item" href="#">Monthly Volume Rankings</a>
								</div>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" name="trending">Trending</a>
								<div className={this.state.trending ? 'show dropdown-menu' : 'dropdown-menu'}>
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
