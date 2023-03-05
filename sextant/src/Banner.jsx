import {ReactComponent as Logo} from './assets/sextant-svgrepo-com.svg';

export default function Banner(props) {
    return (
        <header className="App-header">
        <Logo className="App-logo" fill="blue" />
        <h1>{props.children}</h1>
      </header>
    )
}