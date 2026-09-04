// @vitest-environment node
import { describe, it, expect, vi } from 'vitest';
import { hashPassword, comparePassword, encrypt, decrypt } from '../../src/lib/auth';

// We must mock the env var since we're not running within Next.js runtime directly in these unit tests
// Wait, Vitest runs in Node, we can set process.env before importing.

describe('Authentication Utils', () => {
  it('should hash a password and be able to verify it', async () => {
    const password = 'mySecurePassword123!';
    const hash = await hashPassword(password);
    
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    
    const isValid = await comparePassword(password, hash);
    expect(isValid).toBe(true);
  });

  it('should reject incorrect passwords', async () => {
    const password = 'mySecurePassword123!';
    const hash = await hashPassword(password);
    
    const isValid = await comparePassword('wrongPassword', hash);
    expect(isValid).toBe(false);
  });

  it('should encrypt and decrypt a payload (JWT)', async () => {
    const payload = { userId: '123', role: 'STUDENT' };
    const token = await encrypt(payload);
    
    expect(typeof token).toBe('string');
    
    const decrypted = await decrypt(token);
    expect(decrypted).toMatchObject(payload);
    expect(decrypted.exp).toBeDefined();
    expect(decrypted.iat).toBeDefined();
  });

  it('should return null for invalid tokens', async () => {
    const decrypted = await decrypt('invalid.token.here');
    expect(decrypted).toBeNull();
  });
});
