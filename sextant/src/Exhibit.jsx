import {ReactComponent as Connection} from "./assets/computer-svgrepo-com.svg"

export default function Exhibit(props) {
    return (
        <div className="Gallery" >
            <div className="Exhibit">
                <h2>IP: {props.children}</h2>
                <Connection fill="#82cfecff" />
            </div>
        </div>
    )
}