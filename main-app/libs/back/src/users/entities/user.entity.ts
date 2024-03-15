import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column({ default: null })
  firstName: null | string;

  @Column({ default: null })
  lastName: null | string;

  @OneToMany(() => Workspace, (workspace) => workspace.author, { eager: true })
  workspaces: Workspace[];
}
