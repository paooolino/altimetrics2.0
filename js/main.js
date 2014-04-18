$(document).ready(function(){
	/** 
		gMap variables
	*/
	
	var map;
	var geocoder = new google.maps.Geocoder();
	var markers = [];
	
	
	
	
	/** 
		gMap functions
	*/
	
	function initMap() {
		// showing google map.
		map = new google.maps.Map( $('#map_canvas')[0], {mapTypeId: google.maps.MapTypeId.ROADMAP} );
		
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
	}	
	
	
	
	
	/**
		page function
	*/
	
	function render() {
		$('#map_canvas').css({
			width : '100%',
			height : 400
		});
	}	
	
	
	
	render();
	initMap();
});
