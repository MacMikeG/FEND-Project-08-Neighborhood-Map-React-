
import React, { Component } from 'react';

/* show google maps infoWindow with fourSquare data */

class DetailsComponent extends Component {

    render() {
        return (
            <div aria-label = {`${this.props.title} information`} className = 'info-window'>
                <h3> {this.props.title} </h3>
                <p tabIndex = '0'> {this.props.address} </p>
                <a href = {this.props.link}> View in Foursquare </a>
            </div>
        )
    }
}

export default DetailsComponent;
