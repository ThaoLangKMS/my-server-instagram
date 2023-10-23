import { Module } from '@nestjs/common';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  imports: [
    MinioClientModule,SupabaseModule
],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
