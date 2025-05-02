import { Controller, Get, Body, Patch, Req, UseGuards } from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'prisma/seed';

@ApiTags('system-config')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('system-config')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Get()
  async findSystemConfig() {
    return await this.systemConfigService.findSystemConfig();
  }

  @Roles(Role.COORDINATOR)
  @Patch()
  async updateSystemConfig(
    @Body() updateSystemConfigDto: UpdateSystemConfigDto,
    @Req() req: any,
  ) {
    return await this.systemConfigService.updateSystemConfig(
      updateSystemConfigDto,
      req.user.id,
    );
  }
}
