import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { NotificationsConsumer } from './notifications.consumer';
import { NotificationsProducer } from './notifications.producer';

@Module({
  imports: [BullModule.registerQueue({ name: 'notifications' })],
  providers: [NotificationsProducer, NotificationsConsumer],
  exports: [NotificationsProducer],
})
export class NotificationsModule {}
