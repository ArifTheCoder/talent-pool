import { Alert, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import ProfileForm, { ProfileFormValues } from './ProfileForm';
import { createProfile } from '../../models/profile';

const CreateProfile: FunctionComponent = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = (values: ProfileFormValues) => {
    createProfile(values)
      .then(() => setShowSuccess(true))
      .catch(() => setShowError(true));
  };

  return (
    <>
      {showError && <Alert severity="error">Failed to create profile</Alert>}
      {showSuccess && (
        <Alert severity="success">Profile created successfully</Alert>
      )}
      <Typography variant="h5" gutterBottom mt={2} mb={2}>
        Create Profile
      </Typography>
      <ProfileForm onSubmit={handleSubmit} />
    </>
  );
};

CreateProfile.displayName = 'CreateProfile';

export default CreateProfile;
