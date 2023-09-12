import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CommitsService {
  async getCommits() {
    try {
      const response = await axios.get(
        'https://api.github.com/repos/OWNER/REPO/commits',
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
