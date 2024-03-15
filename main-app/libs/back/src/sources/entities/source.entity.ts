import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity()
export class Source {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.sources)
  workspace: Workspace;
}
