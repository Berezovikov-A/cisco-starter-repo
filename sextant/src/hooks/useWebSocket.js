import { useState, useEffect } from 'react';
const W3CWebSocket = require("websocket").w3cwebsocket;

function useWebSocket(url) {

    const [latency, setLatency] = useState(null);

    useEffect(() => {

        const client = new W3CWebSocket(url);

        client.onerror = () => {
            console.error("Unable to connect.")
        };
    
        client.onopen = () => {
            console.log("WebSocket connection established");
        };
    
        client.onclose = () => {
            console.log("Connection closed");
        };
    
       client.onmessage = (message) => {
            let serverTime = message.data.valueOf();
            let timeNow = new Date().getTime().valueOf();
            let latency =  timeNow - serverTime;
            setLatency(latency.toString() + "ms");
        };

    }, [url]);

    return latency;

};


export default useWebSocket;