import Homepage from './Homepage';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Homepage />
    </AuthProvider>
  );
}

export default App;
