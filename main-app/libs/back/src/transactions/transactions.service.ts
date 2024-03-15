import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WorkspacesService } from '../workspaces/workspaces.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private repo: Repository<Transaction>,
    @Inject(WorkspacesService) private workspacesService: WorkspacesService
  ) {}

  async create({ workspaceId, ...args }: CreateTransactionDto): Promise<Transaction> {
    try {
      const workspace = await this.workspacesService.findOne(workspaceId);
      const transaction = this.repo.create(args);
      transaction.workspace = workspace;

      return await this.repo.save(transaction);
    } catch {
      throw new BadRequestException('workspace not found');
    }
  }

  async findAllByWorkspaceId(id: string): Promise<Transaction[]> {
    const workspace = await this.workspacesService.findOne(id);

    workspace.transactions.forEach((transaction) => {
      transaction.workspace = workspace;
    });

    return workspace.transactions;
  }
}
