import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GithubFetcher from './GithubFetcher'
  
class App extends Component {

    render() {
        return (
            <GithubFetcher />
        );
    }
}

// ========================================

ReactDOM.render(
<App />,
document.getElementById('app')
);
