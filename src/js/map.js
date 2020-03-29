const makeMap = function (el, coords, zoom, style, marks) {
    if (!document.getElementById(el)) return false;

    mapboxgl.accessToken = 'pk.eyJ1IjoicmVsaXR3ZWIiLCJhIjoiY2pvazA2NGt0MGEwNTNybW1weWoxNnBkMSJ9.zsDQd4Hakn1pW3OqlOWKhQ';
    const map = new mapboxgl.Map({
        container: el,
        style: style,
        center: coords,
        zoom: zoom
    });

    if (marks && marks.length) {
        console.log(marks);

        const markers = {
            type: 'FeatureCollection',
            features: marks.map(item => {
                return {
                    type: 'Feature',
                    properties: {
                        id: item.id
                    },
                    geometry: {
                        type: "Point",
                        coordinates: item.coordinates
                    }
                }
            })
        }

        map.loadImage("../images/static/map-marker.png", function (error, image) {
            if (error) throw error;
            map.addImage("custom-marker", image);
            map.addLayer({
                id: "markers",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: markers
                },
                layout: {
                    "icon-image": "custom-marker",
                    "icon-anchor": "bottom"
                },
            });
        });

        if (marks.length > 1) {
            const bounds = new mapboxgl.LngLatBounds();

            markers.features.forEach(function (feature) {
                bounds.extend(feature.geometry.coordinates);
            });
            map.fitBounds(bounds, {
                padding: 40
            });

            map.on('click', 'markers', function (e) {
                map.flyTo({ center: e.features[0].geometry.coordinates, speed: 0.6, zoom: 14 });
                document.querySelector('.store[data-id="' + e.features[0].properties.id + '"]').click();
            });
            map.on('mouseenter', 'markers', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'markers', function () {
                map.getCanvas().style.cursor = '';
            });
        } else {
            map.setCenter(markers.features[0].geometry.coordinates)
            map.setZoom(14)
        }
    }

    window.userMap = map;
    return map;
}

export default makeMap;
