import { useEffect, useState } from 'react';
import { getProfiles, Profile } from '../models/profile';

export const useProfiles = (): [Profile[], string | undefined] => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getProfiles()
      .then(setProfiles)
      .catch(() => setError('Failed to load profiles'));
  }, []);

  return [profiles, error];
};
