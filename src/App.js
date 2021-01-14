import { Index } from './app/index';
import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import 'font-awesome/css/font-awesome.min.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Index />
      </div>
    </Provider>
  );
}

export default App;
