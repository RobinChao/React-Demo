
// Load the React library
import React from 'react';
import ajax from 'superagent';
import { Link  } from 'react-router';

// Define a new React component
class Detail extends React.Component {

	// 构造器
	constructor(props){
		super(props); 

		this.state = { 
			mode: 'commits',
			commits: [], 
			forks: [],
			pulls: []
		};
	}


	featchData(type) {
		const baseURL = 'https://api.github.com/repos/facebook';
		ajax.get(`${baseURL}/${this.props.params.repo}/${type}`) 
		.end((error, response) => {
			if (!error && response) { 
 					this.setState({ [type]: response.body });
 				} else {
 					console.log('There was an error featching ${type} from GitHub', error);
 				}
		});
	}
 

 	componentWillMount() {
 		this.featchData('commits');
 		this.featchData('forks');
 		this.featchData('pulls');
 	}

	// The main entrance of our component, return somthing to draw in screen
	render() {  
  		
		let content;

		if (this.state.mode == 'commits') {
			content = this.renderCommits();
		} else if (this.state.mode == 'forks') {
			content = this.renderForks();
		} else {
			content = this.renderPulls();
		}

		return (
			<div>
				<button onClick={this.selectMode.bind(this, 'commits')}>Show Commits</button>
				<button onClick={this.selectMode.bind(this, 'forks')}>Show Forks</button>
				<button onClick={this.selectMode.bind(this, 'pulls')}>Show Pulls</button>

				{content}
			</div>
			);

	} 

	selectMode(mode) {
		this.setState({ mode });
	} 

	renderCommits() {
		return this.state.commits.map((commit, index) => {
  					const author = commit.author ? commit.author.login : 'Anonumous';  

  					return (
  						<p key={index}>
  						<Link to ={ `/user/${author}` }><strong>{author}</strong></Link>:
  						<a href={commit.html_url}>{commit.commit.message}</a>.
  						</p>
  						);
  				});
	}

	renderForks() {
		return this.state.forks.map((fork, index) => {
			const owner = fork.owner ? fork.owner.login : 'Anonumous';
			return (
  						<p key={index}>
  						<Link to ={ `/user/${owner}` }><strong>{owner}</strong></Link>:
  						<a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
  						</p>
  						);
		});
	}

	renderPulls() {
		return this.state.pulls.map((pull, index) => {
			const user = pull.owner ? pull.owner.login : 'Anonumous';
			return (
  						<p key={index}>
  						<Link to ={ `/user/${user}` }><strong>{user}</strong></Link>:
  						<a href={pull.html_url}>{pull.body}</a>.
  						</p>
  						);
		});
	}
}


export default Detail;