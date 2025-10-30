import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FunctionComponent } from 'react';
import parentsUrls from '../urls';

const Register: FunctionComponent = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').optional(),
    password: Yup.string().min(8, 'At least 8 characters').required('Required'),
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setStatus(undefined);

          const success = await register(
            values.username,
            values.email,
            values.password,
          );
          setSubmitting(false);

          if (success) navigate(parentsUrls.login);
          else setStatus('Registration failed');
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
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                Create account
              </Button>
              <Typography variant="body2">
                Already have an account?
                <Link to={parentsUrls.login}>Login</Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

Register.displayName = 'Register';

export default Register;
