import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { PostDto } from './dto/post.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import * as mimeTypes from 'mime-types';
import { LikeDto } from './dto/like.dto';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class PostService {
  constructor(
    private minioClientService: MinioClientService,
    private supabaseService: SupabaseService
  ) {}

  async createPost(postInfo: PostDto) {
    const uploadedFileURLs = await Promise.all(postInfo.medias.map(file => this.uploadAndProcessFile(file)));

    const postData = {
        title: postInfo.title,
        content: postInfo.title,
        medias: uploadedFileURLs, 
        user_id:postInfo.user_id,
      };
  
      const { data, error } = await this.supabaseService.getSupabase().from('post').upsert([postData]);
  
      if (error) {
        throw new Error('Error while inserting post into Supabase.');
      }
  
      return data;
  }

  async addLikePost(likeInfo: LikeDto) {
    const likeData = {
        post_id: likeInfo.post_id,
        user_id:likeInfo.user_id,
      };
  
      const { data, error } = await this.supabaseService.getSupabase().from('like').upsert([likeData]);
  
      if (error) {
        throw new Error('Error while adding like into Supabase.');
      }
  
      return data;
  }

  async addCommentPost(commentInfo: CommentDto) {
    const likeData = {
        post_id: commentInfo.post_id,
        user_id:commentInfo.user_id,
        content:commentInfo.content
      };
  
      const { data, error } = await this.supabaseService.getSupabase().from('comment').upsert([likeData]);
  
      if (error) {
        throw new Error('Error while adding comment into Supabase.');
      }
  
      return data;
  }

  async uploadAndProcessFile(file: BufferedFile) {
    const fileURL = await this.minioClientService.upload(file);
  
    const mimeType = mimeTypes.lookup(file.originalname);
    let fileType = 'unknown'; 
  
    if (mimeType) {
      if (mimeTypes.contentType(mimeType).startsWith('image')) {
        fileType = 'image';
      } else if (mimeTypes.contentType(mimeType).startsWith('video')) {
        fileType = 'video';
      }
    }
  
    return { type: fileType, url: fileURL };
  }
}




