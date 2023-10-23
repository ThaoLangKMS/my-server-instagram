import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    MinioClientModule,SupabaseModule
],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
