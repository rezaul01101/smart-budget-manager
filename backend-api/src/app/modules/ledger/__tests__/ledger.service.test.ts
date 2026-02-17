/// <reference types="jest" />
import { LedgerService } from "../ledger.service";
import { prisma } from "../../../../shared/prisma";
import { LedgerType } from "../ledger.interface";
import { User } from "../../../../generated/prisma/client";

// Mock the Prisma client
jest.mock("../../../../shared/prisma", () => ({
  prisma: {
    ledger: {
      create: jest.fn(),
    },
    subLedger: {
      createMany: jest.fn(),
    },
  },
}));

describe("LedgerService - createLedgerService", () => {
  const mockUser: User = {
    id: 1,
    email: "test@example.com",
    password: "hashedPassword",
    name: "Test User",
    image: null,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockLedgerData: LedgerType = {
    name: "Salary",
    type: "INCOME",
    icon: "wallet",
    color: "#00FF00",
  };

  const mockLedgerDataWithSubLedger: LedgerType = {
    ...mockLedgerData,
    subLedger: ["Sub 1", "Sub 2", "Sub 3"],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Success cases", () => {
    it("should create a ledger without sub-ledgers", async () => {
      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...mockLedgerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);

      const result = await LedgerService.createLedgerService(
        mockLedgerData,
        mockUser
      );

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
      expect(prisma.ledger.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          name: mockLedgerData.name,
          type: mockLedgerData.type,
          icon: mockLedgerData.icon,
          color: mockLedgerData.color,
        },
      });
      expect(prisma.subLedger.createMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockCreatedLedger);
    });

    it("should create a ledger with sub-ledgers", async () => {
      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        name: mockLedgerDataWithSubLedger.name,
        type: mockLedgerDataWithSubLedger.type,
        icon: mockLedgerDataWithSubLedger.icon,
        color: mockLedgerDataWithSubLedger.color,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockSubLedgerResult = { count: 3 };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);
      (prisma.subLedger.createMany as jest.Mock).mockResolvedValue(
        mockSubLedgerResult
      );

      const result = await LedgerService.createLedgerService(
        mockLedgerDataWithSubLedger,
        mockUser
      );

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
      expect(prisma.ledger.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          name: mockLedgerDataWithSubLedger.name,
          type: mockLedgerDataWithSubLedger.type,
          icon: mockLedgerDataWithSubLedger.icon,
          color: mockLedgerDataWithSubLedger.color,
        },
      });

      expect(prisma.subLedger.createMany).toHaveBeenCalledTimes(1);
      expect(prisma.subLedger.createMany).toHaveBeenCalledWith({
        data: [
          {
            ledgerId: mockCreatedLedger.id,
            userId: mockUser.id,
            name: "Sub 1",
          },
          {
            ledgerId: mockCreatedLedger.id,
            userId: mockUser.id,
            name: "Sub 2",
          },
          {
            ledgerId: mockCreatedLedger.id,
            userId: mockUser.id,
            name: "Sub 3",
          },
        ],
      });

      expect(result).toEqual(mockCreatedLedger);
    });

    it("should handle empty sub-ledger array", async () => {
      const ledgerWithEmptySubLedger: LedgerType = {
        ...mockLedgerData,
        subLedger: [],
      };

      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...mockLedgerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);

      const result = await LedgerService.createLedgerService(
        ledgerWithEmptySubLedger,
        mockUser
      );

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
      expect(prisma.subLedger.createMany).not.toHaveBeenCalled();
      expect(result).toEqual(mockCreatedLedger);
    });

    it("should handle EXPENSE type ledger", async () => {
      const expenseLedger: LedgerType = {
        name: "Groceries",
        type: "EXPENSE",
        icon: "shopping-cart",
        color: "#FF0000",
      };

      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...expenseLedger,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);

      const result = await LedgerService.createLedgerService(
        expenseLedger,
        mockUser
      );

      expect(prisma.ledger.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          name: expenseLedger.name,
          type: "EXPENSE",
          icon: expenseLedger.icon,
          color: expenseLedger.color,
        },
      });
      expect(result).toEqual(mockCreatedLedger);
    });
  });

  describe("Error cases", () => {
    it("should throw an error when ledger creation fails", async () => {
      const mockError = new Error("Database connection failed");
      (prisma.ledger.create as jest.Mock).mockRejectedValue(mockError);

      await expect(
        LedgerService.createLedgerService(mockLedgerData, mockUser)
      ).rejects.toThrow("Database connection failed");

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an error when sub-ledger creation fails", async () => {
      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...mockLedgerDataWithSubLedger,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockError = new Error("Failed to create sub-ledgers");

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);
      (prisma.subLedger.createMany as jest.Mock).mockRejectedValue(mockError);

      await expect(
        LedgerService.createLedgerService(mockLedgerDataWithSubLedger, mockUser)
      ).rejects.toThrow("Failed to create sub-ledgers");

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
      expect(prisma.subLedger.createMany).toHaveBeenCalledTimes(1);
    });

    it("should handle unique constraint violation", async () => {
      const mockError = new Error(
        'Unique constraint failed on the fields: (`name`,`userId`)'
      );
      (mockError as any).code = "P2002";

      (prisma.ledger.create as jest.Mock).mockRejectedValue(mockError);

      await expect(
        LedgerService.createLedgerService(mockLedgerData, mockUser)
      ).rejects.toThrow();

      expect(prisma.ledger.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge cases", () => {
    it("should handle ledger creation with single sub-ledger", async () => {
      const ledgerWithSingleSub: LedgerType = {
        ...mockLedgerData,
        subLedger: ["Single Sub"],
      };

      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...mockLedgerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);
      (prisma.subLedger.createMany as jest.Mock).mockResolvedValue({
        count: 1,
      });

      const result = await LedgerService.createLedgerService(
        ledgerWithSingleSub,
        mockUser
      );

      expect(prisma.subLedger.createMany).toHaveBeenCalledWith({
        data: [
          {
            ledgerId: mockCreatedLedger.id,
            userId: mockUser.id,
            name: "Single Sub",
          },
        ],
      });
      expect(result).toEqual(mockCreatedLedger);
    });

    it("should handle special characters in sub-ledger names", async () => {
      const ledgerWithSpecialChars: LedgerType = {
        ...mockLedgerData,
        subLedger: ["Sub & Co", "Test (2024)", "Special@#$"],
      };

      const mockCreatedLedger = {
        id: 1,
        userId: mockUser.id,
        ...mockLedgerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.ledger.create as jest.Mock).mockResolvedValue(mockCreatedLedger);
      (prisma.subLedger.createMany as jest.Mock).mockResolvedValue({
        count: 3,
      });

      await LedgerService.createLedgerService(
        ledgerWithSpecialChars,
        mockUser
      );

      expect(prisma.subLedger.createMany).toHaveBeenCalledWith({
        data: [
          { ledgerId: 1, userId: 1, name: "Sub & Co" },
          { ledgerId: 1, userId: 1, name: "Test (2024)" },
          { ledgerId: 1, userId: 1, name: "Special@#$" },
        ],
      });
    });
  });
});
