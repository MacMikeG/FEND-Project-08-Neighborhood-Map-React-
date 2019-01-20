# Neighborhood Map (React)

Project for Udacity Front End Nanodegree

Project rubric:
https://github.com/MacMikeG/FEND-Project-08-Neighborhood-Map-React-/blob/master/Udacity_Project_08_Neighborhood_Map_rubric.pdf

## Description

The neighborhood map application is a complex project, that requires interaction with third-party libraries and APIs servers through asynchronous requests and a variety of data points, using React framework and its design patterns. 

My implementation of the Neighborhood Map Project, is a Responsive Web Application, that displays map with markers of 30 vegan-friendly places in the center of Prague. 
Each marker has a green-leaf icon, that jumps after selecting it. Animation of all the markers falling can be seen just after opening the app.

Application has a simple, intuitive design: header bar with a hamburger icon and title, main part of the window with a map and a footer that contains link to FourSquare.com and information about data source. Hamburger icon toggles on/off sidebar on the left hand side, that contains list of venues that reflects displayed locations on the map. Click on one of the list items or on corresponding marker on the map, centers the view on it and displays an infoWindow from that specific location. Shown balloon contains the name of the place, address and a link redirecting for details to FourSquare.

I used Fetch API for asynchronous fetch of data, that was then converted to JSON and used to create locations list, followed by markers by Google Maps API .



## Installation

- Clone or download and unzip the packed repository 
- it is necessary to replace GOOGLE_MAPS_API_KEY value in App.js component with a valid API KEY.
- Using terminal and NPM commands in created directory: 
    npm install, 
    npm start
- web browser will load project through local server, by default on port 3000


 ## TODO
	- add additional data from 2nd api to display in infoWindow or modal / wikipedia
	- center selected venue in windowsviewspace (marker offsets, eg. lat: venue.location.lat + 0.0002?)
	- add map style
	- make filter menu disapear after click
	- make one source of truth for gMaps initial center and FourSquare reference point
	- add option to select the query
	- move the search input field to the header, leaving menu on the left
	- sort list by popularity of places
