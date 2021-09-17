// Mapboxgl Accesstoken
mapboxgl.accessToken = 'pk.eyJ1IjoiamFhcm9uIiwiYSI6ImNrdGhqbng0ZTAzM3kzMW1zdmZrZ3hqdDQifQ.KL46guHqXp9UKPGyxXKsZQ';


const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.091542,42.358862],
        zoom: 12,
    });

//Bus object array
const buses = [];

//Move buses
async function run(){    
	const locations = await fetchBusLocations();
	 

// Map buses
for (let i = 0; i < locations.length; i++) { 
		
    if (buses.length < locations.length) {
       busname = new mapboxgl.Marker()
       busname.setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
       .addTo(map)
       buses.push(busname);
    }

    // move buses
    if  (buses.length === locations.length) {
        busname = buses[i];
        busname.setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude])
    }
}
setTimeout(run, 15000);
}

// Request bus data from MBTA
async function fetchBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();