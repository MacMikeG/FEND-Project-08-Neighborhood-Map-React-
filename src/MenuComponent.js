/*global google*/

import React, {Component} from 'react';


/* 
    display and filter venues: locations and markers
*/

class MenuComponent extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {                  //receive typed queries, set state
        this.setState({
            query: query
        });
    }

    openInfoWindow = (location) => {                //if clicked marker matches the location, open it's the infoWindow
        this.props.markers.forEach((marker) => {
            if (location.id === marker.id)
                google.maps.event.trigger(marker, 'click');
        });
    }

    getFilteredLocations = (query) => {                 //Returns a list of locations that match the given query
        const locations = this.props.locations;
        const markers = this.props.markers;

        if (query) {                            //ensure that provided query matches the format of markers and locations data
            markers.forEach(marker => {         //return filtered markers and locations if matches the query
                let markerIsVisible = marker.title.toLowerCase().includes(query.toLowerCase());
                marker.setVisible(markerIsVisible);
        });
            return locations.filter(location => location.name.toLowerCase().includes(query.toLowerCase()));
        }
        else return locations;
    }

    render() {
        let filteredLocations = this.getFilteredLocations(this.state.query)

        return (
            <div className = 'side-menu'>
                <div  className = 'user-input'>
                    <input                              //input element re-rendered after each update of query
                        type = 'text'
                        placeholder = '  Search...'
                        value = {this.state.query}
                        onChange = {(event) => this.updateQuery(event.target.value) }
                    />
                </div>

                {filteredLocations.map(location =>      //menu list of locations updated by mapping along with queries
                    <div className = 'list-item'
                        aria-labelledby = 'side-menu'
                        tabIndex = '0' 
                        role = 'listitem' 
                        key = {location.id} 
                        onClick = {() => this.openInfoWindow(location)}>
                        {location.name}
                    </div>
                )}
            </div>
        )
    }
}

export default MenuComponent;
