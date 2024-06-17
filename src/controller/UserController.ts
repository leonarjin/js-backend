import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt"; // Para criptografar a senha

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  // Recuperar todos os usuários
  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  // Recuperar um único usuário por ID
  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  // Salvar um novo usuário (Registro)
  async save(request: Request, response: Response, next: NextFunction) {
    const { email, username, password } = request.body;

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = Object.assign(new User(), {
      email,
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // Remover um usuário por ID
  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
