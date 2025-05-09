import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Nav from './Nav';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from './components/Layout';
import BCOE from './pages/BCOE';
import CNAS from './pages/CNAS';
import CollegeRatingsPage from './components/CollegeRatingsPage';
import ClassPage from './pages/classpages/ClassPage';        
import ClassPageBCOE from './pages/classpages/ClassPageBCOE'; 
import RateCoursePage from './pages/RateCoursePage';
import CourseChatPage from './pages/CourseChatPage';
import CollegeRatingsPageCNAS from './components/CollegeRatingsPageCNAS';

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
            path="/classpages/cnas/:courseId"
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
              <Route 
                  path="/college/:collegeId/ratings"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <CollegeRatingsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
          <Route
            path="/chat/:courseId"
            element={
              <ProtectedRoute>
                <Layout>
                  <CourseChatPage/>
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/college/CNAS/ratings"
            element={
              <ProtectedRoute>
                <Layout>
                  <CollegeRatingsPageCNAS />
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