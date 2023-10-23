import { PostService } from './post.service';
import { Controller, Post, UseInterceptors, UploadedFile,UploadedFiles, Body } from '@nestjs/common';
import { FileInterceptor ,FileFieldsInterceptor } from '@nestjs/platform-express'
import { PostDto } from './dto/post.dto';
import { LikeDto } from './dto/like.dto';
import { CommentDto } from './dto/comment.dto';


@Controller('post')
export class PostController {
    constructor(
      private postService: PostService
    ) {}
  
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 10 }, 
  ]))
  async createPost(@Body() postInfo: PostDto) {
    return this.postService.createPost(postInfo);
  }

  @Post('like')
  async addLikePost(@Body() likeInfo: LikeDto) {
    return this.postService.addLikePost(likeInfo);
  }

  @Post('comment')
  async addCommentPost(@Body() commentInfo: CommentDto) {
    return this.postService.addCommentPost(commentInfo);
  }
}
