import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FunctionComponent } from 'react';
import parentsUrls from '../urls';

const Login: FunctionComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setStatus(undefined);
          const success = await login(values.username, values.password);
          setSubmitting(false);
          if (success) navigate('/');
          else setStatus('Invalid credentials');
        }}
      >
        {({
          isSubmitting,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
        }) => (
          <Form>
            {status && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {status}
              </Alert>
            )}
            <Box sx={{ display: 'grid', gap: 2 }}>
              <TextField
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                required
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                required
              />
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Login
              </Button>
              <Typography variant="body2">
                No account? <Link to={parentsUrls.register}>Register</Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

Login.displayName = 'Login';

export default Login;
