import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'src/minio-client/file.model';
import { SupabaseService } from 'src/supabase/supabase.service';
import * as mimeTypes from 'mime-types';
import { FollowDto } from './dto/follow.dto';
import { User } from '@supabase/supabase-js';

@Injectable()
export class AccountService {
  constructor(
    private supabaseService: SupabaseService
  ) {}

  async addFollow(followInfo: FollowDto) {
    const followData = {
        follower_id: followInfo.follower_id,
        following_id: followInfo.following_id,
      };
  
      const { data, error } = await this.supabaseService.getSupabase().from('follower').upsert([followData]);
  
      if (error) {
        throw new Error('Error while adding follower into Supabase.');
      }
  
      return data;
  }

  async removeFollow(followInfo: FollowDto) {  
      const {error } = await this.supabaseService.getSupabase().from('follower').delete()
      .eq('follower_id', followInfo.follower_id).eq('following_id', followInfo.following_id)
  
      if (error) {
        throw new Error('Error while removing follower into Supabase.');
      }
  }

  async searchUsers(keyword: string): Promise<User[]> {
    const { data, error } = await this.supabaseService
    .getSupabase()
    .from('account')
    .select('*')
    .eq('username', keyword);

    return data;
  }

  
}




