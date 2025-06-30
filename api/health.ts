import type { VercelRequest, VercelResponse } from '@vercel/node';

// This is a top-level log to see if the function file is even being executed.
console.log('HEALTH_CHECK_FILE_EXECUTED');

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
} 