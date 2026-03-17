import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('notifications')
export class NotificationsConsumer extends WorkerHost {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async process(_job: Job): Promise<void> {
    // TODO: process notification job (send emails to followers)
  }
}
