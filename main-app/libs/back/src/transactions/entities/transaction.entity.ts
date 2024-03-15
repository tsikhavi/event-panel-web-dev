import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Workspace } from '../../workspaces/entities/workspace.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  totalPrice: number;

  @Column({ nullable: true })
  amountOfDays: null | number;

  @Column({ nullable: true })
  amountOfMembers: null | number;

  @ManyToOne(() => Workspace, (workspace) => workspace.transactions)
  workspace: Workspace;

  @CreateDateColumn()
  createdAt: Date;
}
