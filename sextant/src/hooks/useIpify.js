import { useState, useEffect } from "react";

function useIpify(toggleVersion) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    let url = "https://api64.ipify.org?format=json";

    if(toggleVersion) { 
        url = "https://api.ipify.org?format=json"
    };

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                (!toggleVersion && data.ip.length <= 15) ? setData("Unavailable") : setData(data.ip);
                setLoading(false);})
            .catch(() => {
                setLoading(false);
                setData("Loading Error!")
            })
    }, [url, toggleVersion]);

    return [loading, data];

};

export default useIpify;