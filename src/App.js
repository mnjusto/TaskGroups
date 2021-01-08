import './App.css';
import List from './components/task_groups/List';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <List/>
      </DndProvider>
    </div>
  );
}

export default App;
