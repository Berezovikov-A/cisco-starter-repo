import useIpify from "../../hooks/useIpify";
import "./Exhibit.css"
import React, {useState, useContext, createContext} from "react"
import { ReactComponent as Icon } from "./assets/computer-svgrepo-com.svg";

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


    return (
        <ToggleContext.Provider value={{toggleVersion, setToggleVersion}}>
            <div className="Item" {...restProps}>
                {children}
                <Icon className="Icon" />
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
    
    const { toggleVersion } = useContext(ToggleContext);
    const  [loading, data] = useIpify(toggleVersion);

    return (
        <div className="Address" {...restProps}>
            <h3>IP: {loading ? "Loading..." : data}</h3>
        </div>
    )
}