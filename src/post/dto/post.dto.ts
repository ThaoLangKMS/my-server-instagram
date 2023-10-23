import { BufferedFile } from 'src/minio-client/file.model';
export class PostDto {
    title: string;
    user_id: string;
    medias: BufferedFile[];
  }
  