import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './uploads.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/modules/user/dto/Role';

@Controller('uploads')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.COORDINATOR)
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

    if (!result) {
      throw new BadRequestException('An error occurred during file upload.');
    }

    return result;
  }
}
