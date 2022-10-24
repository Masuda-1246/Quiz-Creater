import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {ChallenerFinishQuiz, ChallengerQuiz, ChallengerResult, ChallengerRoom, Creater, ScreenQuiz, ScreenQuizStart, ScreenResult} from './pages/index'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ChallengerRoom />} />
        <Route path='/creater' element={<Creater />} />
        <Route path='/quiz_starter' element={<ScreenQuizStart />} />
        <Route path='/quiz' element={<ScreenQuiz />} />
        <Route path='/quiz_c' element={<Chat />} />
        <Route path='/quiz_c' element={<ChallengerQuiz />} />
        <Route path='/finish' element={<ChallenerFinishQuiz />} />
        <Route path='/result' element={<ScreenResult />} />
        <Route path='/result_c' element={<ChallengerResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
