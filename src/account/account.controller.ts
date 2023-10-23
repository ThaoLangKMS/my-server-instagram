import { Body, Controller, Delete, Post, UseGuards,Get, Req, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { LikeDto } from 'src/post/dto/like.dto';
import { FollowDto } from './dto/follow.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@supabase/supabase-js';

@Controller('account')
export class AccountController {constructor(
    private accountService: AccountService
  ) {}

  @UseGuards(AuthGuard)
  @Post('follow')
  async addFollow(@Body() followInfo: FollowDto) {
    return this.accountService.addFollow(followInfo);
  }

  @UseGuards(AuthGuard)
  @Delete('follow')
  async removeFollow(@Body() followInfo: FollowDto) {
    return this.accountService.removeFollow(followInfo);
  }

  @Get('search')
  @UseGuards(AuthGuard)
  async searchUsers(@Query('keyword') keyword: string): Promise<User[]> {
    const users = await this.accountService.searchUsers(keyword);
    return users;
  }
}

