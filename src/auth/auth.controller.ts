import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { UserToken } from './models/UserToken';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: AuthRequest): Promise<UserToken> {
        return this.authService.login(req.user);
    }

    @Get("currentUser")
    async getMe(@CurrentUser() user: User) {
        return user;
    }
}