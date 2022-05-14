import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByName(loginDto.username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await compare(loginDto.password, user.password);

    if (match) {
      return { ...this.generateTokens(user), permissions: user.permissions };
    }

    throw new UnauthorizedException('Username or password are not valid');
  }

  async refresh(refreshToken: string | undefined) {
    let decoded: { id: number };

    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: 'Refresh secret',
      });
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.usersService.findById(decoded.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { ...this.generateTokens(user), permissions: user.permissions };
  }

  private generateTokens({ username, id, permissions }: User) {
    const accessToken = this.jwtService.sign(
      { username, id, permissions },
      { expiresIn: '1m', secret: 'Access secret' },
    );
    const refreshToken = this.jwtService.sign(
      { id },
      { expiresIn: '1d', secret: 'Refresh secret' },
    );

    return { accessToken, refreshToken };
  }
}
