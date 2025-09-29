// controllers/authController.js
import bcrypt from 'bcryptjs';
import * as userService from '../services/userService.js';
import * as tokenService from '../services/tokenService.js';

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await userService.findByEmailOrUsername(email) || await userService.findByEmailOrUsername(username);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await userService.createUser({ username, email, password_hash });

    return res.status(201).json({ message: 'User created', user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await userService.findByEmailOrUsername(emailOrUsername);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = tokenService.signToken({ id: user.id, username: user.username });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res, next) {
  try {
    // If auth middleware is used, req.user will be set
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    res.json({ message: `Hello ${req.user.username}`, username: req.user.username });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.json({ message: 'Logged out' });
}
