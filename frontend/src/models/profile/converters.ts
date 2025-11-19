import { Profile, ProfileData } from './types';

export const convertProfileData = (data: ProfileData): Profile => ({
  pk: data.id,
  name: data.name,
  email: data.email,
  phone: data.phone,
  address: data.address,
  city: data.city,
  state: data.state,
  zipCode: data.zip_code,
  country: data.country,
  skills: data.skills,
});
