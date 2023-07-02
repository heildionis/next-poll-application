import dynamic from 'next/dynamic';

export const PollCreatePageAsync = dynamic(() => import('./PollCreatePage'));
