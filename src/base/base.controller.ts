import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BaseService } from './base.service';
import { TaskService } from '../task/task.service';

@Controller('base')
export class BaseController {
  constructor(
    private baseService: BaseService,
    private taskService: TaskService,
  ) {}
  @Post('/alice')
  async alice(@Body() details) {
    await this.baseService.alice(details);
  }

  @Post('/bob')
  async bob(@Body() details) {
    await this.baseService.bob(details);
  }

  @Get('/get-block-detail')
  async getBlockDetails() {
    return this.taskService.getBlockAdded();
  }

  @Get('/block-count')
  async blockCount() {
    return this.taskService.getBlockCount();
  }

  @Get('/individual-block')
  async IndividualBlock(@Query() params) {
    return this.taskService.getBlockIndividualBlockCount(params.number);
  }
}
