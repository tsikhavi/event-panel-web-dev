import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { workspace } from '../__test-data__/workspaces.test-data';
import { WorkspacesService } from '../workspaces/workspaces.service';

import { Transaction } from './entities/transaction.entity';
import { createTransaction, transaction, transactionsList, workspaceId } from './test-data/transactions.test-data';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let workspacesService: WorkspacesService;

  const mockWorkspacesService: Partial<WorkspacesService> = {
    findOne: jest.fn().mockResolvedValue(workspace),
  };

  const mockRepository: Partial<Repository<Transaction>> = {
    create: jest.fn().mockReturnValue(transaction),
    save: jest.fn().mockResolvedValue(transaction),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        { provide: getRepositoryToken(Transaction), useValue: mockRepository },
        { provide: WorkspacesService, useValue: mockWorkspacesService },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    workspacesService = module.get<WorkspacesService>(WorkspacesService);
  });

  describe('create', () => {
    it('should return a new transaction', async () => {
      const result = await transactionsService.create(createTransaction);

      expect(mockWorkspacesService.findOne).toHaveBeenCalledWith(createTransaction.workspaceId);
      expect(mockRepository.create).toHaveBeenCalledWith({ ...createTransaction, workspaceId: undefined });
      expect(mockRepository.save).toHaveBeenCalledWith(transaction);
      expect(result).toEqual(transaction);
    });

    it('should throw BadRequestException when workspace not found', async () => {
      jest.spyOn(workspacesService, 'findOne').mockRejectedValue(null);

      try {
        await transactionsService.create(createTransaction);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(mockRepository.create).toHaveBeenCalledTimes(0);
        expect(mockRepository.save).toHaveBeenCalledTimes(0);
      }
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should return a list of transactions', async () => {
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue({ ...workspace, transactions: transactionsList });

      const result = await transactionsService.findAllByWorkspaceId(workspaceId);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspaceId);
      expect(result).toEqual(transactionsList);
    });

    it('should return an empty list when the workspace has no transactions', async () => {
      // TODO How to reset mocked resolved value for workspacesService ???
      jest.spyOn(workspacesService, 'findOne').mockResolvedValue(workspace);

      const result = await transactionsService.findAllByWorkspaceId(workspaceId);

      expect(workspacesService.findOne).toHaveBeenCalledWith(workspaceId);
      expect(result).toEqual([]);
    });

    it('should should throw NotFoundException when workspace not found', async () => {
      jest.spyOn(workspacesService, 'findOne').mockImplementation(() => {
        throw new NotFoundException();
      });

      await expect(transactionsService.findAllByWorkspaceId(workspaceId)).rejects.toThrow(NotFoundException);
    });
  });
});
