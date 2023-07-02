import dynamic from 'next/dynamic';

export const PollPageAsync = dynamic(() => import('./PollPage'));
