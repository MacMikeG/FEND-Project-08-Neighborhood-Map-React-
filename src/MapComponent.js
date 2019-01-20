/*global google*/

import React, {Component} from 'react';
import ReactDOMServer from 'react-dom/server';

import MenuComponent from './MenuComponent';
import DetailsComponent from './DetailsComponent';

import './index.css';
import custMarker from './custMarker.png';


/*  
    fetch data from FourSquare
    use it to create locations and markers 
    add events to markers
    mount google maps
*/

class MapComponent extends Component {

    state = {
        locations_state: [],
        markers_state: [],
        fetchFail: false,
        mapCenter: {
            lat: 50.084190,
            lng: 14.423474 }
    }

    fetchFoursquare() {
        const params = {                                                        //FourSquare's API query properties
            url: 'https://api.foursquare.com/v2/venues/explore?',               //API's entry point
            client_id: 'HNIBIFKNSBGMYVVAQ5SVS4LJIAWZHGY1N05EMZ1Q1C1YGJ1W',
            client_secret: 'ALTRQQRSB0ASLKJVTY52RYUIQXIPDIBB5S2YVUEWVS5KBRNR',
            v: '20181211',
            query: 'vegan',
            ll: '50.084190,14.423474',  //near: 'Prague',
            radius: 100000,
            limit: 30
        }
        fetch(params.url + new URLSearchParams(params))         
            .then(response => {                                     //resolution of returned promise
                    console.log('response: ', response)
                return response.json()                              //convert returned object (promise) to JSON
            })
            .then(res2JSON => {
                    console.log('res2json: ', res2JSON)
                const resPars = res2JSON.response.groups[0].items   //parse the JSON    //.slice(0,10)
                    console.log('resPars: ', resPars)           
                const markers = []
                resPars.forEach(entry => {                       //for each retrieved entry
                    const marker = this.createMarker(entry)      //google maps method will create markers 
                    markers.push(marker)                         //push created markers to the array
                })
                    console.log('markers: ', markers)
                const locations = resPars.map(item => {          //return specific location 
                    return item.venue                            //by mappping each entry
                })
                    console.log('locations: ', locations)
                this.setState({
                    locations_state: locations,
                    markers_state: markers
                })
            })
            .catch(error => {
                console.log('fetch error: ', error)
                this.setState({
                    fetchFail: true
                })
                    
            })
    }


    /* create markers from the fetched locations data */

    createMarker = (location) => {
        const marker = new google.maps.Marker({             //google maps marker constructor
            position: {                                     //takes object specifying initial properties
                lat: location.venue.location.lat,
                lng: location.venue.location.lng },
            icon: custMarker,
            title: location.venue.name,
            map: this.map,
            id: location.venue.id,
            animation: google.maps.Animation.DROP
        });
        this.markerEvent(marker, location);
        return marker;
    }


    /* add event of showing google maps infoWindow with location data for the clicked marker */

    markerEvent = (marker, location) => {
        marker.addListener('click', () => {
            if (this.infoWindow.marker !== marker) {    //Open info window for this marker
                this.infoWindow.marker = marker;
                this.infoWindow.setContent(
                    ReactDOMServer.renderToString(      //method allows to print HTML into 
                        <DetailsComponent
                            title = {location.venue.name}
                            address = {location.venue.location.formattedAddress}
                            link = {'https://foursquare.com/v/' + location.venue.id}
                        />)
                );

                this.infoWindow.open(this.map, marker);
                this.infoWindow.addListener('closeclick', () => {   //stop the marker animation when infoWindow is closed
                    this.infoWindow.setMarker = null;
                    marker.setAnimation(null);
                });
            }
            this.state.markers_state.forEach(marker => marker.setAnimation(null));        // Remove the bounce animation from previous clicked markers

            if (marker.getAnimation() !== null)         // Add bounce animation to the clicked marker
                marker.setAnimation(null);
            else
                marker.setAnimation(google.maps.Animation.BOUNCE);
        });
    }


    /* initial settings for running google maps */

    loadGoogleMaps() {
        const mapPosition = {
            center: this.state.mapCenter,
            zoom: 13
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapPosition);
        this.infoWindow = new google.maps.InfoWindow();
    }



    componentDidMount() {
        this.fetchFoursquare();
        this.loadGoogleMaps();
    }



    render() {
        return (
            <div>
                {this.state.fetchFail && <h4 className = 'loadMsg'>             {/* element for displaying foursquare error */}
                    Error while loading locations data. <br /> 
                    Please refresh or try again later.<br />
                    Additional info can be found in the console logs.</h4>}

                <div id = 'map' role = 'application'></div>                     {/* element for displaying google maps map */}

                {this.props.menuIsHidden === false && <MenuComponent
                        role = 'menu'
                        locations = {this.state.locations_state}
                        markers = {this.state.markers_state} />}
            </div>
        )
    }
}

export default MapComponent;
