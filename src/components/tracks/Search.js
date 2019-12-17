import React, { Component } from 'react'
import {Consumer} from '../../context'
import axios from 'axios'
export default class Search extends Component {
    state = {
        trackTitle: ''
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (dispatch,e) => {
        e.preventDefault();
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                dispatch({
                    type: 'Search_track',
                    payload: res.data.message.body.track_list
                })
                this.setState({
                    trackTitle: ''
                })

            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const {dispatch} = value
                    return (
                        <React.Fragment>
                        <h1>search</h1>
                        <form onSubmit={this.onSubmit.bind(this,dispatch)} className="form-group">
                            <input type="text" className="form-group" placeholder="Search title..."
                                name="trackTitle" value={this.state.trackTitle}
                                onChange={this.onChange}
                            />
                            <button type="submit" className="btn btn-block btn-dark">Get song</button>
                        </form>
                        </React.Fragment>
                    )
                    }
                }
            </Consumer>
        )
    }
}
