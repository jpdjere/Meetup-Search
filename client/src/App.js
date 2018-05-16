import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import querystring from 'querystring';
import meetup_logo from './meetup_logo.svg';
import './App.css';
import Meetups from './components/Meetups';
import Bounds from 'meetup-web-components/lib/layout/Bounds';
import Section from 'meetup-web-components/lib/layout/Section';
import Button from 'meetup-web-components/lib/forms/Button';
// import Button from 'meetup-web-components/lib/forms/Button';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meetups: [],
			query: 'javascript',
			loading: false,
			error: false,
			searchMode:true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.fetchEvents = this.fetchEvents.bind(this);
		this.fetchFavs = this.fetchFavs.bind(this);
		this.toggleMode = this.toggleMode.bind(this);
	}

	toggleMode(){
		this.setState(prevState => {
			return {
				searchMode: !prevState.searchMode
			}
		})
	}

	fetchEvents(search_term) {
		this.setState({
			meetups: [],
			query: search_term,
			loading: true,
			error: false,
		});

		const qs = querystring.stringify({
			zip: '10012',
			text: search_term,
			fields: 'rsvp_sample',
			page: '15',
			key: '6752511f3291b2b182ee4d2ef312',
			time: '1w,',
		});

		const apiUrl = `https://api.meetup.com/2/open_events/?${qs}`;
		const self = this;

		fetchJsonp(apiUrl)
			.then(response => response.json())
			.then(json =>
				self.setState({
					meetups: json.results,
					query: search_term,
					loading: false,
					error: false,
				})
			)
			.catch(ex => {
				console.error(ex);
				self.setState({
					meetups: [],
					query: search_term,
					loading: false,
					error: true,
				});
			});
	}

	fetchFavs(){
		return new Promise((resolve, reject) => {
			fetch('/api/favourites')
			.then(res => res.json())
			.then(data => {
				this.setState({
					favs: data.favs
				})
				resolve();
			})
			.catch(e => reject(e))

		})
	}

	componentDidMount() {
		this.fetchEvents('javascript');
		this.fetchFavs();
	}

	handleSubmit(e) {
		e.preventDefault();
		this.fetchEvents(document.getElementById('query').value);
	}
	render() {
		return (
			<div style={{minHeight:'1000px'}}>
				<Section>
					<Bounds className="align--center">
						<img src={meetup_logo} className="logo" alt="logo" />
					</Bounds>
				</Section>
				<Section>
					<form onSubmit={this.handleSubmit}>
						<div className="row bounds bounds--wide">
							<div className="row-item chunk">
								<input
									id="query"
									type="text"
									name="query"
									placeholder="Find some Meetups..."
									disabled={this.state.searchMode ? false : true}
								/>
							</div>
							<div className="row-item chunk row-item--shrink">
								<Button
									className="button--primary"
									disabled={this.state.searchMode ? false : true}
									>Search
								</Button>
							</div>
						</div>
					</form>
				</Section>
				<Section>
					<Bounds>
						<div style={{display:'flex',justifyContent:'space-between'}}>
							<h1 className="text--display1 margin--bottom">
								{this.state.searchMode ? this.state.query : "Your Favorite"} Meetups
							</h1>
							<Button
								className="button--secondary"
								onClick={() => this.toggleMode()}
								style={{height:'50px'}}
							>
								{this.state.searchMode ? "Favorites" : "Search for Meetups"}
							</Button>
						</div>
						{this.state.error ? (
							<p className="text--error text--bold">
								Looks like something went wrong…
							</p>
						) : (
							''
						)}
						{this.state.loading ? (
							<div className="loader">Loading...</div>
						) : (
							<Meetups
								query={this.state.query}
								error={this.state.error}
								meetups={this.state.searchMode ? this.state.meetups : this.state.favs}
								searchMode={this.state.searchMode}
								fetchFavs={this.fetchFavs}
							/>
						)}
					</Bounds>
				</Section>
			</div>
		);
	}
}

export default App;
