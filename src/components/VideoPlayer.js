import React from "react";
import {LinkContainer} from 'react-router-bootstrap';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/cjs/Button";
import ReactPlayer from "react-player";
import Container from "react-bootstrap/cjs/Container";

import 'bootstrap/dist/css/bootstrap.min.css';

class VideoPlayer extends React.Component {
    constructor(props) {
        console.log("VIDEOOOOO")
        super(props);
        this.onProgress= this.onProgress.bind(this);
        this.onPause= this.onPause.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.onReady = this.onReady.bind(this);

        let url = "";
        if (props.url == ""){
            url ='https://drive.google.com/uc?export=download&id=1ukI_1oNyH6snfFZfNztbWUA1hdNpQjn4';
        } else {
            url = props.url;
        }

        console.log(url);

        this.ref = React.createRef();
        this.state = {
            'duration': 0.0,
            "database": props.database,
            'url': url ,
            'is_join': props.is_join || false,
            'playing':false,
        };

        console.log(`is_join ${this.state.is_join}`)

        setTimeout(()=>{
            this.state.database.state.ref.onSnapshot(doc=>{
                console.log(doc.data());
                this.setState({'url': doc.data()['url'], 'playing': doc.data()['mode'] == 'play'})

            });

        },1000)


    }


    onReady(){
        console.log("Player is ready to play...");
        if(this.state.is_join){
            console.log('Initiating join')
            this.state.database.state.ref.onSnapshot(doc => {
                let data = doc.data();
                if(Math.abs(data['time'] - this.state.duration) >= 5.0) {
                    this.ref.current.seekTo(data['time'], 'seconds');
                }
            })

        }
    }

    onPlay(){
        //console.log(this.state.database)
        console.log("User has pressed play...");
        this.state.database.togglePlay("play");
    }

    onPause(){
        console.log("User has paused the video")
        //console.log(this.state.database)
        this.state.database.togglePlay("pause");
    }

    onSeek(sec){
        console.log(`User has seeked to ${sec}`);
        //this.state.database.setSeek(sec);
    }

    onBuffer(){
        console.log("User is buffering...");

    }

    onProgress(dur){
        this.state.duration = dur['playedSeconds'];
        console.log(this.state.duration)
        this.state.database.setSeek(dur['playedSeconds']);
    }



    render() {
        console.log(`Rendering video with url ${this.state.url}`)
        return(
            <div>
                <Container>
                    <ReactPlayer
                        ref={this.ref}
                        url={this.state.url}
                        controls={true}
                        light={false}
                        onPlay={this.onPlay}
                        onPause={this.onPause}
                        onBuffer={this.onBuffer}
                        onSeek={this.onSeek}
                        onReady={this.onReady}
                        onProgress={this.onProgress}
                        playing={this.state.playing}
                    />
                    <Button onClick = {()=> this.ref.current.seekTo(5,'seconds')}>FIVE</Button>
                </Container>
            </div>
        );
    }
}

export default VideoPlayer;