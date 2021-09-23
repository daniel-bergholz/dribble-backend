import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FileService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async upload(file: string): Promise<UploadApiResponse> {
    try {
      const response = await cloudinary.uploader.upload(file, {
        transformation: {
          width: 989,
          height: 718,
          crop: 'fill',
        },
      });
      return response;
    } catch {
      throw new BadRequestException('Erro no upload da imagem');
    }
  }

  async remove(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch {
      throw new BadRequestException('Erro ao remover imagem');
    }
  }
}
