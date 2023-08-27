import AuthService from "@/server/service/AuthService";
import { prismaMock } from "@/singleton";
import bcrypt from "bcrypt";

const SAMPLE_USER = {
  id: 1,
  email: "testmail",
  password: "xxxxx",
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("user authentication", () => {
  it("should not verify null user", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    await expect(AuthService.verifyUser("xxx", "xxx")).resolves.toEqual(null);
  });

  it("should verify user", async () => {
    // @ts-ignore
    prismaMock.user.findFirst.mockResolvedValue(SAMPLE_USER);
    (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);

    await expect(
      AuthService.verifyUser(SAMPLE_USER.email, SAMPLE_USER.password)
    ).resolves.toEqual({
      id: SAMPLE_USER.id,
      email: SAMPLE_USER.email,
    });
  });

  it("should not verify wrong credentials", async () => {
    // @ts-ignore
    prismaMock.user.findFirst.mockResolvedValue(SAMPLE_USER);
    (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);

    await expect(
      AuthService.verifyUser(SAMPLE_USER.email, SAMPLE_USER.password)
    ).resolves.toEqual(null);
  });

  it("should not verify error bcrypt", async () => {
    // @ts-ignore
    prismaMock.user.findFirst.mockResolvedValue(SAMPLE_USER);
    (bcrypt.compare as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error("Random error"));

    await expect(
      AuthService.verifyUser(SAMPLE_USER.email, SAMPLE_USER.password)
    ).resolves.toEqual(null);
  });

  it("should not verify database error", async () => {
    prismaMock.user.findFirst.mockRejectedValue(new Error("Random error"));

    await expect(
      AuthService.verifyUser(SAMPLE_USER.email, SAMPLE_USER.password)
    ).resolves.toEqual(null);
  });
});
