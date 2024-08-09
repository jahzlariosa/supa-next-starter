'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaCamera } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface Profile {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  avatar_url: string;
  email: string;
}

export default function WidgetEditProfile() {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profile, setProfile] = useState<Profile>({
    id: '',
    username: '',
    firstname: '',
    lastname: '',
    avatar_url: '',
    email: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files && files[0]) {
      setAvatarFile(files[0]);
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = avatarFile.name.replace(`.${fileExt}`, '');
      const newFileName = `${fileName}-${Date.now()}.${fileExt}`;
      const avatarPath = `avatars/${profile.id}/${newFileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(avatarPath, avatarFile, {
        upsert: true,
      });

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError);
        return;
      }

      const { data, error: urlError }: any = await supabase.storage.from('avatars').getPublicUrl(avatarPath);

      if (urlError) {
        console.error('Error getting avatar URL:', urlError);
        return;
      }

      profile.avatar_url = data.publicUrl;
    }

    const { error } = await supabase.from('profiles').update(profile).eq('id', profile.id);

    if (error) {
      console.error('Error updating profile:', error);
      return;
    }

    router.push('/profile');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='w-full'>
      <form
        onSubmit={handleSubmit}
        className='space-y-6 bg-white p-8 rounded-lg shadow-md'
      >
        <div className='flex justify-center mb-6 relative'>
          <div
            className='relative group cursor-pointer'
            onClick={handleAvatarClick}
          >
            <img
              src={avatarPreview || profile.avatar_url || '/default-avatar.png'}
              alt='Avatar Preview'
              className='h-24 w-24 object-cover rounded-full border-2 border-gray-300'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <FaCamera className='text-white text-2xl' />
            </div>
            <input
              type='file'
              name='avatar'
              id='avatar'
              accept='image/*'
              onChange={handleChange}
              ref={fileInputRef}
              className='hidden'
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </Label>
          <Input
            type='text'
            name='username'
            id='username'
            value={profile.username}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <Label
            htmlFor='firstname'
            className='block text-sm font-medium text-gray-700'
          >
            First Name
          </Label>
          <Input
            type='text'
            name='firstname'
            id='firstname'
            value={profile.firstname}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <Label
            htmlFor='lastname'
            className='block text-sm font-medium text-gray-700'
          >
            Last Name
          </Label>
          <Input
            type='text'
            name='lastname'
            id='lastname'
            value={profile.lastname}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div>
          <Label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </Label>
          <Input
            type='email'
            name='email'
            id='email'
            value={profile.email}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
        <div className='mt-6 flex justify-center'>
          <Button
            type='submit'
            className='w-full'
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
