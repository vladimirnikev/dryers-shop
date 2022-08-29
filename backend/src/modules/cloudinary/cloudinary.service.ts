import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(url: string) {
    url = url.slice(27); // It remove first part of url, that include 'https://res.cloudinary.com/'
    try {
      const image = await v2.search.expression(url).execute();
      await v2.uploader.destroy(image.resources[0].public_id);
    } catch (error) {
      throw new NotFoundException('Image does not exist');
    }
  }
}
