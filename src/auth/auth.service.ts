import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  // Usuário “seed” em memória só para demo. Em produção, valide em DB.
  private seedUser = {
    email: process.env.SEED_USER_EMAIL || "admin@example.com",
    password: process.env.SEED_USER_PASSWORD || "admin123",
  };

  constructor(private jwt: JwtService) {}

  async validate(email: string, password: string) {
    if (email !== this.seedUser.email) throw new UnauthorizedException();
    // Comparação simples — apenas para DEMO!
    const ok = await bcrypt.compare(
      password,
      await bcrypt.hash(this.seedUser.password, 10)
    );
    if (!ok) throw new UnauthorizedException();
    return { email };
  }

  async login(email: string) {
    const payload = { sub: email, email };
    return { access_token: await this.jwt.signAsync(payload) };
  }
}
