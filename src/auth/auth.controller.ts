import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  async login(
    @Body() body: { email: string; password: string }
  ): Promise<{ access_token: string }> {
    const user = await this.auth.validate(body.email, body.password);
    return this.auth.login(user.email);
  }
}
