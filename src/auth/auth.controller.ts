import { Controller, Post, Body, Req, Res, HttpStatus, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() reqBody) {
    return this.authService.signup(reqBody.email, reqBody.password,reqBody.username);
  }

  @Post('signin')
  async signin(@Body() reqBody) {
    return this.authService.signin(reqBody.email, reqBody.password);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.logout();
      return res.status(HttpStatus.OK).json('Logged out successfully');
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error.message);
    }
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar')) 
  async updateProfile( @Body() reqBody: UpdateProfileDto ) {
    const updatedProfile = await this.authService.updateProfile(reqBody.id, reqBody.username, reqBody.avatarFile);
     updatedProfile;
  }
}
