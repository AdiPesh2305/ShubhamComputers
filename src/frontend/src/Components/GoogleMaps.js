import React, { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '350px'
};

const center = {
    address: 'Rajesh Building, Opposite Lamington Road Police Station.',
    lat: 18.96107363466559,
    lng: 72.81740892600374
};

function GoogleMaps() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCCbae3DmuiVLEbiG4czrgRx6XJrR60RJ0"
    })

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <Box sx={{ mt: 1 }}>
            {isLoaded ? (
                <GoogleMap
                    className="kalpesh"
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <MarkerF position={{ lat: 18.96107363466559, lng: 72.81740892600374 }} title="Shubham Computers" />
                </GoogleMap>
            ) : <h1>Loading google maps</h1>
            }
        </Box>
    )
}

export default React.memo(GoogleMaps);