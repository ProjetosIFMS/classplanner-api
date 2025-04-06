import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../databases/prisma.database';
import { supabase } from '../../databases/supabase.database';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, projectId: string) {
    const filePath = `${Date.now()}-${file.originalname}`;

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      throw new Error(`Error to make upload: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = await supabase.storage.from('uploads').getPublicUrl(filePath);

    const pedagogicalProject = await this.prisma.pedagogicalProject.update({
      where: { id: projectId },
      data: { documentUrl: publicUrl },
    });

    return pedagogicalProject;
  }
}
