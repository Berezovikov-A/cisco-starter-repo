import { useState, useEffect } from "react";

function useIpify(toggleVersion) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    let url = "https://api64.ipify.org?format=json";

    if(toggleVersion) { 
        url = "https://api.ipify.org?format=json"
    };

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true);
        fetch(url, { signal: controller.signal })
            .then(response => response.json())
            .then(data => {
                (!toggleVersion && data.ip.length <= 15) ? setData("v6 Is Unavailable") : setData(data.ip);
                setLoading(false);})
            .catch(() => {
                setLoading(false);
                setData("Loading Error!")
            
        return () => controller.abort();
            })
    }, [url, toggleVersion]);

    return [loading, data];

};

export default useIpify;