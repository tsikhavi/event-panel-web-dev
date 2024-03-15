import { Test, TestingModule } from '@nestjs/testing';

import { createTransaction, transaction, transactionsList } from './test-data/transactions.test-data';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;

  const mockTransactionsService: Partial<TransactionsService> = {
    create: jest.fn().mockResolvedValue(transaction),
    findAllByWorkspaceId: jest.fn().mockResolvedValue(transactionsList),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [{ provide: TransactionsService, useValue: mockTransactionsService }],
    }).compile();

    transactionsController = module.get<TransactionsController>(TransactionsController);
    transactionsService = module.get<TransactionsService>(TransactionsService);
  });

  describe('create', () => {
    it('should call transactionsService.create and return the result', async () => {
      const result = await transactionsController.create(createTransaction);

      expect(transactionsService.create).toHaveBeenCalledWith(createTransaction);
      expect(result).toEqual(transaction);
    });
  });

  describe('findAllByWorkspaceId', () => {
    it('should call transactionsService.findAllByWorkspaceId and return the result', async () => {
      const workspaceId = 'workspace-id-123';
      const result = await transactionsController.findAllByWorkspaceId(workspaceId);

      expect(transactionsService.findAllByWorkspaceId).toHaveBeenCalledWith(workspaceId);
      expect(result).toEqual(transactionsList);
    });
  });
});
