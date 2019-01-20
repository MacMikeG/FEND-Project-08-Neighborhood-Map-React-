
import React, {Component} from 'react'
import './index.css'
import MapComponent from './MapComponent'

/*
    init google maps
*/


class App extends Component {

    state = {
        loadMsg: 'initializing Google Maps...',
        menuIsHidden: false,
        scriptIsLoaded: false
    }

    initGoogleMaps() {
        const GOOGLE_MAPS_API_KEY = '';
        const mapScript = document.createElement('script');
        mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
        mapScript.async = true;
        document.body.appendChild(mapScript);
        mapScript.onload = () => {
            this.setState ({
                scriptIsLoaded: true,
                loadMsg: 'Google Maps script loaded successfully.'
            })  
        }
        mapScript.onerror = () => {
            this.setState ({
                scriptIsLoaded: false,
                loadMsg: 'Error while loading Google Maps script. Please refresh or try again later.'
            })
        }
        window.gm_authFailure = () => {
            this.setState ({
                scriptIsLoaded: false,
                loadMsg: 'Authentication error while loading Google Maps. Please ensure that the valid API key was provided.'
            })
        }
    }

    showMenu = () => {
        if (this.state.menuIsHidden) {
            this.setState ({
                menuIsHidden: false
            })
        } else {
            this.setState ({
                menuIsHidden: true
            })
        }
    }

    componentDidMount () {
        this.initGoogleMaps()
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'header' aria-label = 'header'>
                    <button aria-label = 'Search for vegan places'
                            className = 'button'
                            onClick = {this.showMenu} />
                    <h1 tabIndex = '1'>Vegan spots in Prague</h1>
                </div>

                {this.state.scriptIsLoaded ?
                <MapComponent menuIsHidden = {this.state.menuIsHidden} /> :
                <h3 className = 'loadMsg'>{this.state.loadMsg}</h3>}

                <div className = 'footer' aria-label = 'footer'>
                    <p>locations data provided by</p>
                    <a href = 'https://foursquare.com'>Foursquare</a>
                </div>
            </div>
        )
    }
}

export default App;
