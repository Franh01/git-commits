import { Controller, Get } from '@nestjs/common';
import { CommitsService } from './commits.service';

@Controller('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}

  @Get()
  async getCommits() {
    const commits = await this.commitsService.getCommits();
    return { commits };
  }
}
