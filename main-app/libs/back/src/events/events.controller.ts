import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';
import { UpdateEventDto } from '@eventpanel/shared/dto/events/update-event.dto';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Serialize } from '../core/interseptors/serialize.interceptor';

import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('auth-token')
@Serialize(EventDto)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() body: CreateEventDto) {
    return await this.eventsService.create(body);
  }

  @Get('/workspace/:id')
  async findAllByWorkspaceId(@Param('id', ParseUUIDPipe) id: string) {
    return await this.eventsService.findAllByWorkspaceId(id);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.eventsService.findOne(id);
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateEventDto) {
    return await this.eventsService.update(id, body);
  }
}
