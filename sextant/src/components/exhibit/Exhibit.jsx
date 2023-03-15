import useIpify from "../../hooks/useIpify";
import useWebSocket from "../../hooks/useWebSocket";
import "./Exhibit.css"
import React, {useState, useContext, createContext} from "react"

const ToggleContext = createContext();


export default function Exhibit({children, ...restProps}) {
    return (
        <div className="Exhibit" {...restProps}>
            {children}
        </div>
    )
}

Exhibit.Item = function ExhibitItem({children, header, isDefault = true, ...restProps}) {

    const [toggleVersion, setToggleVersion] = useState(isDefault);
    const latency = useWebSocket("ws://localhost:55455")
    const  [loading, data] = useIpify(toggleVersion);


    return (
        <ToggleContext.Provider value={{toggleVersion, setToggleVersion, loading, data, latency}}>
            <div className="Item" {...restProps}>
                {children}
            </div>
        </ToggleContext.Provider>
    )
}

Exhibit.Switch = function ExhibitSwitch({children, ...restProps}) {
    
    const {toggleVersion, setToggleVersion} = useContext(ToggleContext);

    return (
        <label className="Switch">
            <input type="checkbox" checked={toggleVersion} onChange={() => setToggleVersion(!toggleVersion)} {...restProps} />
            <span className="slider">{toggleVersion ? "V4" : "V6"}</span>
        </label>
    )
}

Exhibit.Address = function ExhibitAddress({children, ...restProps}) {
    
    const { loading, data } = useContext(ToggleContext);

    return (
        <div className="Address" {...restProps}>
            <h3>IP: {loading ? "Loading..." : data}</h3>
        </div>
    )
}

Exhibit.Gauge = function ExhibitGauge({children, ...restProps}) {

    const {latency} = useContext(ToggleContext);

    return (
        <div className="Gauge">
            <div className="Bar" style={{transform:  `rotate(${(latency * 2.25) + 5}deg)`, background: `hsl(${82 - latency + 8}, 78%, 43%)`}}></div>
            <p className="Value">{latency}ms</p>
        </div>
    )
}