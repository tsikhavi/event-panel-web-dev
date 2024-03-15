import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Source } from '../../sources/entities/source.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToMany(() => Source)
  @JoinTable()
  sources: Source[];

  @ManyToOne(() => Workspace, (workspace) => workspace.events)
  workspace: Workspace;
}
