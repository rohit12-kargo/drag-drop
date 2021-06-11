import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DragbalePage from './pages/DragbalePage';
import WasteOne from './pages/wateOne/WasteOne';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={DragbalePage} />
          <Route path='/wast' component={WasteOne} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
