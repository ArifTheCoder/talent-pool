import { Button, TextField, Autocomplete, Box } from '@mui/material';
import { Profile } from '../../models/profile';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FunctionComponent } from 'react';

type ProfileFormProps = {
  profile?: Profile;
  onSubmit: (values: ProfileFormValues) => void;
};

export type ProfileFormValues = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  skills?: string[];
};

const SKILL_OPTIONS: string[] = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'Django',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Git',
];

const ProfileForm: FunctionComponent<ProfileFormProps> = ({
  profile,
  onSubmit,
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });
  return (
    <Formik
      initialValues={{
        name: profile?.name ?? '',
        email: profile?.email ?? '',
        phone: profile?.phone ?? '',
        address: profile?.address ?? '',
        city: profile?.city ?? '',
        state: profile?.state ?? '',
        zipCode: profile?.zipCode ?? '',
        country: profile?.country ?? '',
        skills: profile?.skills ?? [],
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        setFieldValue,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => (
        <Form>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            width="50%"
          >
            <TextField
              name="name"
              label="Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
            />
            <TextField
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              fullWidth
            />
            <TextField
              name="phone"
              label="Phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              name="address"
              label="Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              name="city"
              label="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              name="state"
              label="State"
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              name="zipCode"
              label="Zip Code"
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <TextField
              name="country"
              label="Country"
              value={values.country}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <Autocomplete
              multiple
              options={SKILL_OPTIONS}
              value={values.skills ?? []}
              onChange={(_, newValue) => setFieldValue('skills', newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  placeholder="Select skills"
                  fullWidth
                />
              )}
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;
