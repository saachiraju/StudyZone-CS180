import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Nav from './Nav';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import BCOE from './pages/BCOE';
import CNAS from './pages/CNAS';
import ClassPage from './pages/classpages/ClassPage';        
import ClassPageBCOE from './pages/classpages/ClassPageBCOE'; 
import RateCoursePage from './pages/RateCoursePage';
import CS180 from './pages/cs180';
import CS153 from './pages/cs153';
import CourseChatPage from './pages/CourseChatPage';


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
          <Route
            path="/classpages/:courseId"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClassPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/classpages/bcoe/:courseId"
            element={
              <ProtectedRoute>
                <Layout>
                  <ClassPageBCOE />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/rate/:courseId"
            element={
              <ProtectedRoute>
                <Layout>
                  <RateCoursePage />
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