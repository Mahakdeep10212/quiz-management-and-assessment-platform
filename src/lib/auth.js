import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';

if (process.env.NODE_ENV === 'production' && (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32)) {
  throw new Error('[SECURITY FATAL] AUTH_SECRET environment variable must be set to a secure string with at least 32 characters in production.');
}

const secretKey = process.env.AUTH_SECRET || 'skillpulse-dev-secret-jwt-key-32-chars-minimum-only-for-local';
const key = new TextEncoder().encode(secretKey);

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
