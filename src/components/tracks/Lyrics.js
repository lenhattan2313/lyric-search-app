import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Lyrics extends Component {
    state = {
        lyrics: {},
        track: {}
    }
    componentDidMount() {

        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                this.setState({
                    lyrics: res.data.message.body.lyrics
                })
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                this.setState({
                    track: res.data.message.body.track
                })

            })
            .catch(err => console.log(err))
    }
    render() {
        const { lyrics, track } = this.state;
        if (Object.keys(lyrics).length === 0 ||
            Object.keys(track).length === 0 ||
            track === undefined || lyrics === undefined) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark ">Go back</Link>
                    <div>
                        <span>Song: <strong>{track.track_name}</strong></span><br />
                        <span><strong>Lyrics:</strong><br /> {lyrics.lyrics_body}</span>
                    </div>
                </React.Fragment>
            )

        }

    }
}
