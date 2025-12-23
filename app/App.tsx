import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home/page';
import LearningExperience from './learning-experience/page';
import Scoreboard from './scoreboard/page';
import Evaluation from './evaluation/page';
import Profile from './profile/page';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <Router>
      <div className="relative">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-experience" element={<LearningExperience />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}