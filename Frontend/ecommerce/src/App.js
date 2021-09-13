import Main from './components/Main';
import './App.css';
import { StateProvider } from './components/StateProvider';
import reducer, { initialState } from './components/reducer';

function App() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Main />
    </StateProvider>
  );
}

export default App;
