import { Box } from '@mui/material';
import { NavBar } from './ui-components';
import { Routes, Route } from 'react-router-dom';
import { Login } from './login';
import { Register } from './registration';
import { FunctionComponent } from 'react';
import parentsUrls from './urls';
import { Dashboard } from './dashboard';

const App: FunctionComponent = () => {
  return (
    <Box>
      <NavBar />
      <Routes>
        <Route path={parentsUrls.dashboard} element={<Dashboard />} />
        <Route path={parentsUrls.login} element={<Login />} />
        <Route path={parentsUrls.register} element={<Register />} />
      </Routes>
    </Box>
  );
};

App.displayName = 'App';

export default App;
