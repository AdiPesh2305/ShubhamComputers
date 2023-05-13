import React, { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    address: 'Rajesh Building, Opposite Lamington Road Police Station.',
    lat: 18.96107363466559,
    lng: 72.81740892600374
};

function GoogleMaps() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.setMapTypeId('hybrid');
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return (
        <Box className="map-container">
            {isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={15}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <MarkerF position={{ lat: 18.96107363466559, lng: 72.81740892600374 }} title="Shubham Computers" />
                </GoogleMap>
            ) : <></>
            }
        </Box>
    )
}

export default React.memo(GoogleMaps);