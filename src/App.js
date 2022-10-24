import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import Creater from './pages/Creater';
import QuizStart from './pages/ScreenQuizStart';
import Quiz from './pages/ScreenQuiz';
import Room from './pages/ChallengerRoom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Room />} />
        <Route path='/creater' element={<Creater />} />
        <Route path='/quiz_starter' element={<QuizStart />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/quiz' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
