import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {

  state = {     //state with an initially empty array for storing the dynamic data fetched from FourSquare with axios
    venues: []  
  }

  componentDidMount() { //when lifecycle event occures:
    //this.loadMap();     //moved to be executed after retrieving venues data
    this.loadVenues();  //load the FourSquare venues (async request)
  }

  loadMap = () => {   // async request- runs before loadVenues   
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBkyQ3QLLNh1nrLb5yFdoVBEVh8hShKwQ&callback=initMap')
    window.initMap = this.initMap
  }

  loadVenues = () => { //https://developer.foursquare.com/docs/api/venues/explore
    let endPoint = 'https://api.foursquare.com/v2/venues/explore?'
    let parameters = {
      client_id: 'HNIBIFKNSBGMYVVAQ5SVS4LJIAWZHGY1N05EMZ1Q1C1YGJ1W',
      client_secret: 'ALTRQQRSB0ASLKJVTY52RYUIQXIPDIBB5S2YVUEWVS5KBRNR',
      v: '20180824',
      near: 'Prague',  //li:'50.10285,14.45668',
      query:'coffee',
    }
    axios.get(endPoint + new URLSearchParams(parameters)) //http client for fetch, create object with parameters specified in loadVenues
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items  //pass the returned array of venues into a state for React use
        }, this.loadMap())    //load the Google Maps API script as a callback function, after venues state receive data
      })
      .catch(error => {                   //print error msg into the console
        console.log('error! ' + error)
      })
  }

  initMap = () => { //as API script callback refers to initMap window
    let map = new window.google.maps.Map(document.getElementById('mapContainer'), {  //access google as a global, window object
      center: {lat: 50.10285, lng: 14.45668},    
      zoom: 13
    })

    this.state.venues.map(newVenue => {  //loop over dynamic venues array/state, for each venue create a marker

      let marker = new window.google.maps.Marker({  //blueprint for all markers
        position: {lat: newVenue.venue.location.lat, lng: newVenue.venue.location.lng},   //lat and lng imported from an array fetched by Axios from FourSquare 
        map: map,
        title: newVenue.venue.name,  //replace with info window
      })
    })
  }

  render() {
    return (  //returns one tag only!
      <main>
        <div id='mapContainer'></div>
      </main>     
    )
  }
}


  let loadScript = (url) => {
    let index = window.document.getElementsByTagName('script')[0] //select the first (0 index) element with the tag name 'script'
    let script = window.document.createElement('script')         //create the <script> element 
    script.src = url                                             //source
    script.async = true                                          //load the script asynchronicouselly
    script.defer = true                                          //fetch the script parallel to parsing, wait with execution after the body content is parsed and rendered
    index.parentNode.insertBefore(script, index)                 //script: newNode, index: referenceNode
  }


export default App;
