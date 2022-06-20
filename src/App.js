import './App.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </BrowserRouter>
  );
}

export default App;
