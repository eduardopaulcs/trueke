import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationsProducer {
  constructor(@InjectQueue('notifications') private queue: Queue) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async notifyFollowers(_brandId: string, _attendanceId: string): Promise<void> {
    // TODO: add job to queue
  }
}
