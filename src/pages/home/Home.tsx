import { Link } from 'react-router-dom';
import './Home.css';

function Home() {

  return (
    <div className="home-container">
      <Link to='/create' className="create-btn btn">CREATE NEW GAME</Link>
      <Link to='/import' className="import-btn btn">IMPORT FROM TXT</Link>
    </div>
  );
}

export default Home;