import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkspacesModule } from '../workspaces/workspaces.module';

import { Group } from './entities/group.entity';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), WorkspacesModule],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
