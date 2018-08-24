import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() { //when lifecycle event occures, load the API script
    this.loadMap();
  }

  loadMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDBkyQ3QLLNh1nrLb5yFdoVBEVh8hShKwQ&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => { //as API script callback refers to initMap window
    let map = new window.google.maps.Map(document.getElementById('mapContainer'), {  //window as a global object of the HTML document
      center: {lat: 50.10285, lng: 14.45668},
      zoom: 15
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
