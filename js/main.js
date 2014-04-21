$(document).ready(function(){
	/** 
		gMap variables
	*/
	
	var map;
	var geocoder = new google.maps.Geocoder();
	var markers = [];
	
	var directions = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer();
	
	
	/** 
		gMap functions
	*/
	
	function initMap() {
		// showing google map.
		map = new google.maps.Map( $('#map_canvas')[0], {mapTypeId: google.maps.MapTypeId.ROADMAP} );
		
		// setup directionsDisplay map renderer
		directionsDisplay.setMap(map);
		
		// centering the map.
		centerMap('Italia', 5);		
		
		// setup click handler.
		google.maps.event.addListener(map, 'click', clickHandler);
	}
	
	function centerMap(localita, zoom){
		if(geocoder){
			geocoder.geocode({'address': localita}, function(results, status){
				if (status == google.maps.GeocoderStatus.OK) {
				  map.setCenter(results[0].geometry.location);
				  map.setZoom(zoom);
				} else {
				  alert("Geocode was not successful for the following reason: " + status);
				}					
			});
		}
	}	

	function clickHandler(ev){
		addMarker(ev.latLng);
	}

	function addMarker(point){
		var marker = new google.maps.Marker({
			position: point, 
			map: map,
			draggable: true
		});   
		markers.push(marker);
		
		if( markers.length > 1 ) {
			renderPath();
		}
	}	
	
	function renderPath() {
		// every path supports up to 10 points

		var mode = google.maps.DirectionsTravelMode.DRIVING;
		//if(document.getElementById("apiedi").checked){
		//	mode = google.maps.DirectionsTravelMode.WALKING;
		//}
		
		for( var m = 0; m < markers.length; m++ ) {
			if( m % 10 == 0 ) {
				
				// build the request
				var start = m;
				var end = markers[m + 9] ? m + 9 : markers.length - 1;
				var request = {
					origin: markers[start].getPosition(),
					destination: markers[end].getPosition(),
					travelMode: mode,
					waypoints: getWaypointsFromMarkers( markers.slice(start+1, end) ),
					avoidHighways: true
				}
				
				// show route
				directions.route(request, function(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {
						directionsDisplay.setDirections(result);
					} else {
						alert("ERROR: "+status);				
					}
				});		
						
			}
		}
	}
	
	function getWaypointsFromMarkers( _markers ) {
		var waypts = [];
		for( var m = 0; m < _markers.length; m++ ) {
			waypts.push({
				location: _markers[m].getPosition(),
				stopover:true
			});					
		}
		return waypts;
	}
	
	
	
	
	/**
		page rendering
	*/
	
	function render() {
		$('#map_canvas').css({
			width : '100%',
			height : 400
		});
	}	
	
	$(window).resize(function(){
		render();	
	});
	
	
	
	
	render();
	initMap();
});
