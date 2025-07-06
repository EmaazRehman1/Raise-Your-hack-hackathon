import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Matchmaking from './pages/Matchmaking';
import Agenda from './pages/Agenda';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import { Network } from './pages/Network';
import MeetingWarmup from './pages/MeetingWarmup';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matches" element={<Matchmaking />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/network" element={<Network />} />
          <Route path="/meeting-warmup" element={<MeetingWarmup />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;