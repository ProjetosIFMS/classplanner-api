import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './uploads.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('files')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|csv)$/)) {
          return callback(
            new BadRequestException(
              'Apenas arquivos JPG, JPEG, PNG, PDF e CSV são permitidos!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('projectId') projectId: string,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado!');
    }

    const result = await this.uploadService.uploadFile(file, projectId);

    if (!result.data) {
      throw new BadRequestException('An error occurred during file upload.');
    }

    return result.data;
  }
}
