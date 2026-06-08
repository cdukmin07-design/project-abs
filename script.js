function findMyLocation(){

    navigator.geolocation.getCurrentPosition(
        function(position){

            const myLat =
                position.coords.latitude;

            const myLng =
                position.coords.longitude;

            const map =
                new kakao.maps.Map(
                    document.getElementById("map"),
                    {
                        center:new kakao.maps.LatLng(
                            myLat,
                            myLng
                        ),
                        level:4
                    }
                );

            new kakao.maps.Marker({
                map:map,
                position:new kakao.maps.LatLng(
                    myLat,
                    myLng
                )
            });

            loadTrashLocations(
                map,
                myLat,
                myLng
            );
        }
    );
}