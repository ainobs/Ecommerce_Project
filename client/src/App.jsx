import { Outlet, UNSAFE_useScrollRestoration } from 'react-router-dom';
import './App.css';
import Notification from './component/Notification';
import SupportChat from './component/SupportChat';

function App() {
  UNSAFE_useScrollRestoration();

  return (
    <div className="">
      <Notification />
      <Outlet />
      <SupportChat />
    </div>
  );
}

export default App;
