import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from '../../categories/entities/category.entity';
import { Event } from '../../events/entities/event.entity';
import { Group } from '../../groups/entities/group.entity';
import { Property } from '../../properties/entities/property.entity';
import { Source } from '../../sources/entities/source.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 5 })
  maxNumberOfMembers: number;

  @OneToMany(() => Transaction, (transaction) => transaction.workspace, { eager: true })
  transactions: Transaction[];

  @OneToMany(() => Group, (group) => group.workspace, { eager: true })
  groups: Group[];

  @OneToMany(() => Category, (category) => category.workspace, { eager: true })
  categories: Category[];

  @OneToMany(() => Event, (event) => event.workspace, { eager: true })
  events: Event[];

  @OneToMany(() => Property, (property) => property.workspace, { eager: true })
  properties: Property[];

  @OneToMany(() => Source, (source) => source.workspace, { eager: true })
  sources: Source[];

  @ManyToOne(() => User, (user) => user.workspaces)
  author: User;

  @Column({ default: null })
  expiredDate: null | Date;
}
