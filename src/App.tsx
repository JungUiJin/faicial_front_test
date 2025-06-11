import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage.tsx';
import LoadingPage from './pages/LoadingPage.tsx';
import MainPage from './pages/MainPage.tsx';
import ResultPage from './pages/ResultPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/result" element={<ResultPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
