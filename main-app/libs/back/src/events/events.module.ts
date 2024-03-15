import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SourcesModule } from '../sources/sources.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';

import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), WorkspacesModule, SourcesModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
