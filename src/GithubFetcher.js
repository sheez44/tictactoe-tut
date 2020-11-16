import React, { Component } from 'react';
import GitProfile from './components/gitProfile'

class GithubFetcher extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nameToBeFetched: '',
            data: [],
            isDisabled: true
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
                        nameToBeFetched: "",
                        isDisabled: true
                    })
                    
                })
            )
            error(
                console.error(error)
            )
        })
    }

    removeItem = (item) => {
        this.state.data.map((savedItem) => {
            if(savedItem.id === item.id) {
                this.setState({
                    data: this.state.data.filter(i => i.id !== item.id)
                })
            }
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
            </div>

        );
    }
}
  
export default GithubFetcher;  