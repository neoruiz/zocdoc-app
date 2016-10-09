import React, { Component } from 'react';
import $ from 'jquery';
import 'imports?$=jquery,jQuery=jquery!../vendor/transition';
import 'imports?$=jquery,jQuery=jquery!../vendor/dropdown';
import emitter from '../emitter';

class Header extends Component {

  state = { media: 'all' };

  // initialize semantic UI dropdown
  // only start search if there is a search query inside of input box
  componentDidMount() {
    $('.ui.dropdown').dropdown({
      onChange: (media) => {
        this.setState({ media });
        this.state.query && this.emitSearch();
      }
    });
  }

  // reset dropdown
  componentWillUnmount() { // eslint-disable-line class-methods-use-this
    $('.ui.dropdown').dropdown('refresh');
  }

  emitSearch = () => emitter.emit('search', this.state);

  // only trigger search while user type enter
  _onKeyUp = e => {
    this.setState({ query: e.target.value });
    e.keyCode === 13 && this.emitSearch();
  };

  render() {
    return (
      <div className="ui inverted vertical segment center aligned">
        <div className="ui right action left icon input massive">
          <i className="search icon" />
          <input
            type="text"
            onKeyUp={this._onKeyUp}
            placeholder="Search..."
            autoFocus
          />
          <div className="ui dropdown button">
            <div className="text">All</div>
            <i className="dropdown icon" />
            <div className="menu">
              <div className="item">All</div>
              <div className="item">Audiobook</div>
              <div className="item">eBook</div>
              <div className="item">Movie</div>
              <div className="item">Music</div>
              <div className="item">Music Video</div>
              <div className="item">Podcast</div>
              <div className="item">TV Show</div>
              <div className="item">Short Film</div>
              <div className="item">Software</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
