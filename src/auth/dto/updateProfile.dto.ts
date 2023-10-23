import { BufferedFile } from 'src/minio-client/file.model';
export class UpdateProfileDto {
  id: string;
  username: string;
  avatarFile: BufferedFile;
}
