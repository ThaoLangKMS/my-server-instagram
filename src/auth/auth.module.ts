import { Module } from '@nestjs/common';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  imports: [SupabaseModule,MinioClientModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
