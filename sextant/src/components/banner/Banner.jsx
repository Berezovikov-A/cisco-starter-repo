import './Banner.css';
import {ReactComponent as Logo} from './assets/sextant-svgrepo-com.svg';

export default function Banner(props) {
  
  return (
      <header className="Banner">
      <Logo className="Banner-logo" />
      <h1 className='Banner-header'>{props.children}</h1>

    </header>
  )
}