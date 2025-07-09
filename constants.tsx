
import React from 'react';
import { StreamingService } from './types';
import { NetflixIcon, DisneyPlusIcon, HboMaxIcon, PrimeVideoIcon, SpotifyIcon } from './components/icons';

export const STREAMING_SERVICES: StreamingService[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    price: 38900,
    icon: <NetflixIcon />,
  },
  {
    id: 'disneyplus',
    name: 'Disney+',
    price: 25900,
    icon: <DisneyPlusIcon />,
  },
  {
    id: 'hbomax',
    name: 'Max (HBO)',
    price: 29900,
    icon: <HboMaxIcon />,
  },
  {
    id: 'primevideo',
    name: 'Prime Video',
    price: 22900,
    icon: <PrimeVideoIcon />,
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    price: 16900,
    icon: <SpotifyIcon />,
  },
];
