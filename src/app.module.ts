import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { PostModule } from './post/post.module';
import { AccountModule } from './account/account.module';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    // SupabaseModule,
    AuthModule,
    MinioClientModule,
    PostModule,
    AccountModule,
    ChatModule
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}

