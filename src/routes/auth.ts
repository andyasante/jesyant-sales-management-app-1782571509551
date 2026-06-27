```typescript
import express from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, validateLogin } from '../utils/validators';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Route for user registration
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    next(error);
  }
});

// Route for user login
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const token = await login(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    next(error);
  }
});

// Route for user logout
router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    await logout(req.user);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
});

export default router;
```