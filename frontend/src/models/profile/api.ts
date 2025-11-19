import axios from 'axios';
import type { Profile, ProfileData } from './types';
import { convertProfileData } from './converters';

export const getProfiles = async (): Promise<Profile[]> => {
  return await axios
    .get<ProfileData[]>('/api/profiles/')
    .then((response) => response.data.map(convertProfileData));
};
