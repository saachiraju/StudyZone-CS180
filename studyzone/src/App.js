import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Nav from './Nav';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import BCOE from './pages/BCOE';
import CNAS from './pages/CNAS';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route 
            path="/nav" 
            element={
              <ProtectedRoute>
                <Layout>
                  <Nav />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bcoe" 
            element={
              <ProtectedRoute>
                <Layout>
                  <BCOE />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cnas" 
            element={
              <ProtectedRoute>
                <Layout>
                  <CNAS />
                </Layout>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
