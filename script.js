const recyclingBins = [
    {
        name: "충남대학교 정문 분리수거장",
        lat: 36.3694,
        lng: 127.3445
    },
    {
        name: "충남대학교 학생회관 분리수거장",
        lat: 36.3678,
        lng: 127.3468
    },
    {
        name: "충남대학교 기숙사 분리수거장",
        lat: 36.3741,
        lng: 127.3497
    },
    {
        name: "궁동 주민센터 재활용 수거함",
        lat: 36.3625,
        lng: 127.3502
    }
];

function getDistance(lat1, lng1, lat2, lng2){

    const R = 6371;

    const dLat = (lat2-lat1) * Math.PI/180;
    const dLng = (lng2-lng1) * Math.PI/180;

    const a =
        Math.sin(dLat/2) ** 2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLng/2) ** 2;

    return R * 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1-a)
    );
}

function findMyLocation(){

    if(!navigator.geolocation){
        alert("위치 정보를 지원하지 않는 브라우저입니다.");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position){

        const myLat = position.coords.latitude;
        const myLng = position.coords.longitude;

        const mapContainer =
            document.getElementById("map");

        const map = new kakao.maps.Map(
            mapContainer,
            {
                center:new kakao.maps.LatLng(myLat,myLng),
                level:4
            }
        );

        // 내 위치 마커
        new kakao.maps.Marker({
            map:map,
            position:new kakao.maps.LatLng(myLat,myLng)
        });

        let nearest = recyclingBins[0];
        let minDistance = Infinity;

        recyclingBins.forEach(bin=>{

            const marker =
                new kakao.maps.Marker({
                    map:map,
                    position:new kakao.maps.LatLng(
                        bin.lat,
                        bin.lng
                    )
                });

            const infoWindow =
                new kakao.maps.InfoWindow({
                    content:
                    `<div style="padding:5px;">
                        ${bin.name}
                    </div>`
                });

            kakao.maps.event.addListener(
                marker,
                'click',
                function(){
                    infoWindow.open(map, marker);
                }
            );

            const distance =
                getDistance(
                    myLat,
                    myLng,
                    bin.lat,
                    bin.lng
                );

            if(distance < minDistance){
                minDistance = distance;
                nearest = bin;
            }

        });

        document.getElementById(
            "nearestInfo"
        ).innerHTML = `
        <h2>가장 가까운 분리수거장</h2>
        <p><strong>${nearest.name}</strong></p>
        <p>거리 : ${(minDistance*1000).toFixed(0)}m</p>
        `;

    },
    function(error){
        alert("위치 정보를 가져올 수 없습니다.");
    });

}