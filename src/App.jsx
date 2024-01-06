import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import List from './components/List'
import Toolbar from '@mui/material/Toolbar';
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="md">
        <Toolbar />
        <List />
      </Container>
    </div>
  );
}

export default App;
