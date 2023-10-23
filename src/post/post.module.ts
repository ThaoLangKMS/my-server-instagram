import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    MinioClientModule,SupabaseModule
],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}

