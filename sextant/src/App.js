import './App.css';
import Exhibit from './components/exhibit/Exhibit';
import Banner from './components/banner/Banner';


function App() {
  return (
    <div className="App">
      <Banner>Sextant</Banner>
      <Exhibit>
        <Exhibit.Item header="IP Address">
          <Exhibit.Switch />
          <Exhibit.Address />
        </Exhibit.Item>
        <Exhibit.Item header={"Latency"}>
          <Exhibit.Gauge />
        </Exhibit.Item>
      </Exhibit>
    </div>
  );
}

export default App;
