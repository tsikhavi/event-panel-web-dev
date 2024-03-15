import { CategoriesModule } from '@eventpanel/back/categories/categories.module';
import { Category } from '@eventpanel/back/categories/entities/category.entity';
import { Event } from '@eventpanel/back/events/entities/event.entity';
import { EventsModule } from '@eventpanel/back/events/events.module';
import { Group } from '@eventpanel/back/groups/entities/group.entity';
import { GroupsModule } from '@eventpanel/back/groups/groups.module';
import { Property } from '@eventpanel/back/properties/entities/property.entity';
import { PropertiesModule } from '@eventpanel/back/properties/properties.module';
import { Source } from '@eventpanel/back/sources/entities/source.entity';
import { SourcesModule } from '@eventpanel/back/sources/sources.module';
import { Transaction } from '@eventpanel/back/transactions/entities/transaction.entity';
import { TransactionsModule } from '@eventpanel/back/transactions/transactions.module';
import { User } from '@eventpanel/back/users/entities/user.entity';
import { UsersModule } from '@eventpanel/back/users/users.module';
import { Workspace } from '@eventpanel/back/workspaces/entities/workspace.entity';
import { WorkspacesModule } from '@eventpanel/back/workspaces/workspaces.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('NX_DB_NAME'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Group, Event, Source, Category, Property, Workspace, Transaction],
      }),
    }),
    UsersModule,
    GroupsModule,
    EventsModule,
    CategoriesModule,
    PropertiesModule,
    WorkspacesModule,
    TransactionsModule,
    SourcesModule,
  ],
  providers: [{ provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) }],
})
export class AppModule {}
