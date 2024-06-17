import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = Router();

// Rota de Registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Verificar se o usuário já existe
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = hashedPassword;

    await userRepository.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRepository = AppDataSource.getRepository(User);

    // Verificar se o usuário existe
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verificar a senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Gerar token
    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrair o token do cabeçalho
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey'); // Verificar o token

    // Verificar se decoded é do tipo JwtPayload
    if (typeof decoded !== 'string' && 'email' in decoded) {
      const email = decoded.email;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Enviar as informações do usuário (sem a senha)
      return res.json({ username: user.username, email: user.email });
    } else {
      return res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Failed to fetch profile' });
  }
});



export default router;
