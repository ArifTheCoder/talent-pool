import { useEffect, useState } from 'react';
import { getProfile, getProfiles, Profile } from '../models/profile';

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

export const useProfile = (): [Profile, string | undefined] => {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setError('Failed to load profile'));
  }, []);

  return [profile, error];
};
