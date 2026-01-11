export const flags = {
  petitionEnabled: process.env.NEXT_PUBLIC_PETITION_ENABLED === 'true',
} as const;
