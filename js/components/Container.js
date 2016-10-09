import React, { Component } from 'react';
import reqwest from 'reqwest';
import List from './List';
import Message from './Message';
import emitter from '../emitter';
import { getMedia } from '../utils';
import $ from 'jquery';

class Container extends Component {

  state = { type: 'start' };

  componentDidMount() {
    let that = this;

    $.ajax({ 
      url : 'https://interview.zocdoc.com/api/1/FEE/MoviesByRank',
      data : {
        authToken : '3b502b3f-b1ff-4128-bd99-626e74836d9c',
        startRankIndex : 1,
        numMovies : 10
      },
      //url : 'https://interview.zocdoc.com/api/1/FEE/AllMovies?authToken=3b502b3f-b1ff-4128-bd99-626e74836d9c', 
      success : function(data){ 
        that.setState({ 
          response : { 
            movieList : data, 
            movieListCount : data.length
          }, type : "somehting" });
        //.fail(err => this.setState({ type: 'error' }));
      } 
    });

    emitter.on('search', ({ media, query }) => {
      this.setState({ type: 'loading' });
     
      $.ajax({ 
        url : 'https://interview.zocdoc.com/api/1/FEE/AllMovies',
        data : {
          authToken : '3b502b3f-b1ff-4128-bd99-626e74836d9c'
        },
        //url : 'https://interview.zocdoc.com/api/1/FEE/AllMovies?authToken=3b502b3f-b1ff-4128-bd99-626e74836d9c', 
        success : function(data){ 
          that.setState({ 
            response : { 
              movieList : data, 
              movieListCount : data.length
            }, type : "somehting" });
          //.fail(err => this.setState({ type: 'error' }));
        } 
      });
    });
  }

  

  componentWillUnmount() { // eslint-disable-line class-methods-use-this
    emitter.removeListener('search');
  }

  mainRender = () => {
    const { type, response } = this.state;
    const msgMap = {
      start: {
        headerMsg: 'Welcome back!',
        iconColor: 'black',
        icon: 'help',
        bodyMsg: 'Please use enter to start search!'
      },
      loading: {
        headerMsg: 'Just one second',
        iconColor: 'blue',
        icon: 'notched circle loading',
        bodyMsg: 'Fetching data......'
      },
      noContent: {
        headerMsg: 'No search results',
        iconColor: 'yellow',
        icon: 'warning',
        bodyMsg: 'There is no data.'
      },
      error: {
        headerMsg: 'Error',
        iconColor: 'red',
        icon: 'warning sign',
        bodyMsg: 'We\'re sorry please try again later.'
      }
    };

    const msg = msgMap[type];

    if (msg) {
      return (<Message {...msg} />);
    }
    return (<List {...response} />);
  };

  render() {
    return (
      <div
        style={{
          margin: '50px auto',
          maxWidth: '900px'
        }}
      >
        {this.mainRender()}
      </div>
    );
  }

}

export default Container;