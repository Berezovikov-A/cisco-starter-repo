import useIpify from "../../hooks/useIpify";
import useWebSocket from "../../hooks/useWebSocket";
import "./Exhibit.css"
import React, { 
    useState, 
    useContext, 
    createContext 
} from "react"

const ToggleContext = createContext();


export default function Exhibit({children, ...restProps}) {
    return (
        <div className="Exhibit" {...restProps}>
            {children}
        </div>
    )
}

Exhibit.Item = function ExhibitItem({children, header, ...restProps}) {

    const [toggleVersion, setToggleVersion] = useState(true);
    const  [loading, data] = useIpify(toggleVersion);

    return (
        <ToggleContext.Provider value={{toggleVersion, setToggleVersion, loading, data}}>
            <div className="Item" {...restProps}>
                <h2 className="Header">{header}</h2>
                {children}
            </div>
        </ToggleContext.Provider>
    )
}

Exhibit.Switch = function ExhibitSwitch({ children, ...restProps }) {
    
    const { toggleVersion, setToggleVersion } = useContext(ToggleContext);

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
            <h3>{"IP: " + (loading ? "Loading..." : data)}</h3>
        </div>
    )
}

Exhibit.Gauge = function ExhibitGauge({children, ...restProps}) {

    const latency = useWebSocket("ws://localhost:55455")

    return (
        <div className="Gauge" {...restProps}>
            <div 
                className="Bar" 
                style={{
                    transform:  `rotate(${ latency <= 80 ? ((latency * 2.25) + 5) : 180 }deg)`, 
                    background: `hsl(${ latency <= 80 ? (82 - latency + 8) : 10 }, 78%, 43%)`}}
                >
            </div>
            <p className="Value">{latency}ms</p>
        </div>
    )
}