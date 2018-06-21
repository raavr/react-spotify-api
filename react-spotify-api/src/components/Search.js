import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
  static propTypes = {
    searchValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.input.value);
  }

  render() {
    const { searchValue } = this.props;

    return (
      <div>
        <input type="text"
          defaultValue={searchValue}
          ref={(input) => this.input = input}
          onKeyUp={this.handleKeyUp}
        />
        <button type="button" onClick={this.handleGoClick}>Go</button>
      </div>
    )
  }
}