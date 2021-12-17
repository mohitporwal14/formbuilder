import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes'
import store from './Redux/Store'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history'

function App() {
  return (
    <Provider store={store()}>
      <ConnectedRouter history={history}>
        <Routes />
        <ToastContainer theme="colored" hideProgressBar={true} closeOnClick />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
