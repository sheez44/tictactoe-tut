import React, { Component } from 'react';
import GitProfile from './components/gitProfile'

class GithubFetcher extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameToBeFetched: '',
            data: [],
            isDisabled: true,
            searchedNames: []
        }

        this.removeItem = this.removeItem.bind(this)
    }

    handleChange = (e) => {
        if(e.target.value !== "") {
            this.setState({
                nameToBeFetched: e.target.value,
                isDisabled: false
            })
        } else {
            this.setState({
                isDisabled: true
            })
        }
    }
    handleClick = (e) => {
        e.preventDefault()
        
        new Promise((resolve, error) => {
            resolve(
                fetch(`https://api.github.com/users/${this.state.nameToBeFetched}`)
                .then(res => res.json())
                .then(res => {
                    let arr = this.state.data
                    arr.push(res)
                    this.setState({
                        data: arr,
                        isDisabled: true,
                        searchedNames: [...this.state.searchedNames, this.state.nameToBeFetched],
                        nameToBeFetched: "",
                    })
                    
                })
            )
            error(
                console.error(error)
            )
        })
    }

    removeItem = (item) => {
        // Try to find the remove id with corresponding state id
        const findItem = this.state.data.find(x => x.id === item.id)
        // If found, then update (remove) state
        if(findItem) {
            this.setState({
                data: this.state.data.filter(i => i.id !== findItem.id)
            })
        }
    }

    fillInput(str) {
        this.setState({
            nameToBeFetched: str,
            isDisabled: false
        })
    }

    render() {
        return (
            <div>
                <h3>Enter your github name:</h3>
                <form action="submit">
                    <input type="text" 
                            name="fetch" 
                            id="gitName"
                            value={this.state.nameToBeFetched}
                            onChange={this.handleChange}/>
                    <button type="submit" disabled={this.state.isDisabled} onClick={this.handleClick}>fetch</button>
                </form>
                <GitProfile brand={this.state.data} onClick={this.removeItem } />
                {this.state.searchedNames.length > 0 ? <h3>Search history:</h3> : ''}
                <ul>
                    {this.state.searchedNames && this.state.searchedNames.map((name, i) => {
                        return <li key={i} onClick={() => this.fillInput(name)}>{name}</li>
                    })}
                </ul>
            </div>

        );
    }
}
  
export default GithubFetcher;  