import { Injectable, BadRequestException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserModel } from '../db/models/user.model';
import { UserTenantModel } from '../db/models/user-tenant.model';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ){}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await UserModel.query().findOne({ username });
    if(!user) throw new BadRequestException('User not found');
    const matched = await compare(password, user.password);
    if(!matched) throw new BadRequestException('Incorrect password');
    const userTenant = await UserTenantModel.query().findOne({ userId: user.id });
    if(!userTenant) throw new BadRequestException('User tenant not found');

    console.log(userTenant)

    const payload = {
      username: user.username,
      userId: user.id,
      tenantId: userTenant.tenantId,
      role: userTenant.role
    };

    const token = await this.jwtService.sign(payload,
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '30d',
      },
    );

    return { token };
  }
}
