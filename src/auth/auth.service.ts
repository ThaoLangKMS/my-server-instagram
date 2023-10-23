import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Request } from 'express';
import { AuthResponse, Session, User } from '@supabase/supabase-js';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';

export interface CustomUser extends User {
  username: string |null;
  avatarUrl: string;
  id:string;
}

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService,private minioClientService: MinioClientService,) {}

  async signup(email: string, password: string, username: string): Promise<User | null> {

    const { user, session } = (await this.supabaseService.getSupabase().auth.signUp({ email, password })).data;
if (true) {
 
  
  const { data: dataSaved, error:accountError } = await this.supabaseService.getSupabase()
    .from('account')
    .insert([
      {
        id: user.id,
        username: username,
        email:user.email
      },
    ]);
  if (accountError) {
    console.error('Fail to add account:', accountError);
    await this.supabaseService.getSupabase().auth.signOut();
  } else {
    console.log('Save account successfully".');
  }
}
    return user;
  }

  async signin(email: string, password: string): Promise<CustomUser | null> {
    const { data, error } = await this.supabaseService
      .getSupabase()
      .auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }

    
    const { data: accountData, error: accountError } = await this.supabaseService
    .getSupabase()
    .from('account')
    .select('*')
    .eq('id', data.user.id);

  if (accountError) {
    throw new Error(accountError.message);
  }

  const user: CustomUser = {
    ...data.user,
    username:  accountData[0]?.username || null , 
    avatarUrl:accountData[0]?.avatarUrl ,
    id: accountData[0]?.id,
  }

  return user;
  }

  async logout(): Promise<void> {
    await this.supabaseService.getSupabase().auth.signOut();
  }

  async createUser(id,username,email):Promise<void>{
    
  const { data, error } = await this.supabaseService
  .getSupabase()
  .from('account')
  .insert([
    { id: id,
      username: username,
      email:email, 
    },
  ])
  .select()

 

}

async updateProfile(id: string, username: string, avatarFile: BufferedFile): Promise<CustomUser | null> {
  const avatarUrl = await this.minioClientService.upload(avatarFile);
  const { data: updatedData, error: updateError } = await this.supabaseService
      .getSupabase()
      .from('account')
      .update({ username, avatarUrl })
      .eq('id', id);

  if (updateError) {
      throw new Error(updateError.message);
  }
  const { data: accountData, error: accountError } = await this.supabaseService
      .getSupabase()
      .from('account')
      .select('*')
      .eq('id', id);

  if (accountError) {
      throw new Error(accountError.message);
  }

  const user: CustomUser = {
      ...accountData[0],
  };

  return user;
}


}
