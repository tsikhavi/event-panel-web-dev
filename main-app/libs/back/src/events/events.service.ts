import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { UpdateEventDto } from '@eventpanel/shared/dto/events/update-event.dto';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SourcesService } from '../sources/sources.service';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private repo: Repository<Event>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService,
    @Inject(SourcesService) private sourcesService: SourcesService
  ) {}

  async create({ workspaceId, ...args }: CreateEventDto): Promise<Event> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const event = this.repo.create(args);
      event.workspace = workspace;
      event.sources = await this.sourcesService.findAllByIds(args.source_ids);

      return await this.repo.save(event);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Event[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.events.forEach((event) => {
      event.workspace = workspace;
    });

    return workspace.events;
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.repo.findOne({ where: { id }, relations: { workspace: true } });

    if (!event) throw new NotFoundException('event not found');

    return event;
  }

  async update(id: string, args: UpdateEventDto) {
    try {
      const event = await this.findOne(id);
      Object.assign(event, args);

      event.sources =
        args.source_ids && args.source_ids.length > 0 ? await this.sourcesService.findAllByIds(args.source_ids) : [];

      return await this.repo.save(event);
    } catch (error) {
      throw new BadRequestException('event not found');
    }
  }
}
