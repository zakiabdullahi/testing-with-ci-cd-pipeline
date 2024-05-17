import { describe, expect, test, it, vi } from "vitest";
import request from "supertest";
import { app } from "../index";

import { prismaClient } from "../__mocks__/db";
vi.mock("../db");

describe("POST /sum", () => {
  it("should return the sum of two numbers", async () => {
    prismaClient.sum.create.mockResolvedValue({
      id: 1,
      a: 1,
      b: 1,
      result: 3,
    });
    vi.spyOn(prismaClient.sum, "create");

    const res = await request(app).post("/sum").send({
      a: 1,
      b: 2,
    });

    expect(prismaClient.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3,
      },
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });
});
