import axios from 'axios';
import type { Profile, ProfileData } from './types';
import { convertProfileData } from './converters';
import { ProfileFormValues } from '../../app/profile/ProfileForm';

function getAccessToken(): string | null {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.accessToken ?? null;
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const convertProfileFormValuesForAPISubmission = (
  values: ProfileFormValues,
) => ({
  name: values.name,
  email: values.email,
  phone: values.phone,
  address: values.address,
  city: values.city,
  state: values.state,
  zip_code: values.zipCode,
  country: values.country,
  skills: values.skills,
});

export const getProfiles = async (): Promise<Profile[]> => {
  return await axios
    .get<ProfileData[]>('/api/profiles/')
    .then((response) => response.data.map(convertProfileData));
};

export const getProfile = async (): Promise<Profile> => {
  return await axios
    .get<ProfileData>('/api/profile/', { headers: authHeaders() })
    .then((response) => convertProfileData(response.data));
};

export const createProfile = async (
  profile: ProfileFormValues,
): Promise<Profile> => {
  return await axios
    .post<ProfileData>(
      '/api/profile/',
      convertProfileFormValuesForAPISubmission(profile),
      { headers: authHeaders() },
    )
    .then((response) => convertProfileData(response.data));
};

export const updateProfile = async (profile: Profile): Promise<Profile> => {
  return await axios
    .put<ProfileData>('/api/profile/', profile, { headers: authHeaders() })
    .then((response) => convertProfileData(response.data));
};
