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

Exhibit.Item = function ExhibitItem({children, ...restProps}) {

    const [toggleVersion, setToggleVersion] = useState(true);

    return (
        <ToggleContext.Provider value={{toggleVersion, setToggleVersion}}>
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
    
    const {toggleVersion} = useContext(ToggleContext);

    return (
        <h2>IP: {toggleVersion ? "192.168.40.116" : "fe80::df0:3ca2:d7c4:6a5b%20"}</ h2>
    )
}