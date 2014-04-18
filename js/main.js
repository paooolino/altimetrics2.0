$(document).ready(function(){
	var map;
	var geocoder = new google.maps.Geocoder();
	
	

	function init() {
		render();
		
		// showing google map.
		map = new google.maps.Map( $('#map_canvas')[0], {mapTypeId: google.maps.MapTypeId.ROADMAP} );
		centerMap('Italia', 5);		
	}
	
	function render() {
		$('#map_canvas').css({
			width : '100%',
			height : 400
		});
	}
	
	function centerMap(localita, zoom){
		if(geocoder){
			geocoder.geocode({'address': localita}, function(results, status){
				console.log(status);
				if (status == google.maps.GeocoderStatus.OK) {
				  map.setCenter(results[0].geometry.location);
				  map.setZoom(zoom);
				} else {
				  alert("Geocode was not successful for the following reason: " + status);
				}					
			});
		}
	}	

	
	
	init();
});
