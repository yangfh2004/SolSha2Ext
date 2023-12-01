import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import crypto from "crypto";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { deployTestSha2Fixture } from "./sha2_ext.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("TestSha2", function () {
    beforeEach(async function () {
      const { tester } = await this.loadFixture(deployTestSha2Fixture);
      this.tester = tester;
      this.hasher = async (input: string): Promise<string> => {
        const hexStr = Buffer.from(input, "utf-8").toString("hex");
        const [first, second] = await this.tester.connect(this.signers.admin).sha384External("0x" + hexStr);
        return first + second.slice(2);
      };
    });

    it("should hash an empty string correctly", async function () {
      const input = "";
      const expectedOutput =
        "0x" + "38b060a751ac96384cd9327eb1b1e36a21fdb71114be07434c0cc7bf63f6e1da274edebfe76f65fbd51ad2f14898b95b";
      const output = await this.hasher(input);
      expect(output).to.equal(expectedOutput);
    });

    it("should hash a string correctly", async function () {
      const input = "hello world";
      const expectedOutput = "0x" + crypto.createHash("sha384").update(input).digest().toString("hex");
      const output = await this.hasher(input);
      expect(output).to.equal(expectedOutput);
    });

    it("should hash a long string correctly", async function () {
      const input =
        "ewogICJhbGciOiAiUFMzODQiLAogICJqa3UiOiAiaHR0cHM6Ly8uLi4vY2VydHMiLAogICJraWQiOiAiMTg4MWY1MTk5NDg2MjFmNy4uLiIsCiAgInR5cCI6ICJKV1QiCn0KLgp7CiAgInNneF9tcmVuY2xhdmUiOiAiYWI5OTg5ZjFjNGMxZmZhMy4uLiIsCiAgInNneF9tcnNpZ25lciI6ICI3ZjRlOGFkYmMxZDhkYTdhZS4uLiIsCiAgInNneF9pc3Zwcm9kaWQiOiAxLAogICJzZ3hfaXN2c3ZuIjogMSwKICAic2d4X3JlcG9ydF9kYXRhIjogIjcxOTIzODVjM2MwNjA1Li4uIiwKICAic2d4X2lzX2RlYnVnZ2FibGUiOiBmYWxzZSwKICAic2d4X2NvbGxhdGVyYWwiOiB7CiAgICAicWVpZGNlcnRoYXNoIjogImIyY2E3MWI4ZTg0OS4uLiIsCiAgICAicWVpZGNybGhhc2giOiAiZjQ1NGRjMWI5YmQ0Yy4uLiIsCiAgICAicWVpZGhhc2giOiAiZDg2MmNhYjMzMmI5NmE3ZmIuLi4iLAogICAgInF1b3RlaGFzaCI6ICJlMzZiM2RmNmZkM2QxLi4uIiwKICAgICJ0Y2JpbmZvY2VydGhhc2giOiAiYjJjYTcxYjhlODQ5ZDUuLi4iLAogICAgInRjYmluZm9jcmxoYXNoIjogImY0NTRkYzFiOWJkNGNlMy4uLiIsCiAgICAidGNiaW5mb2hhc2giOiAiZGM4MDBmMTY4YzUyOGFmLi4uIgogIH0sCiAgImF0dGVzdGVyX2hlbGRfZGF0YSI6ICJTblZ6ZENCemIyMWxJSFJsYzNRZ1ouLi4iLAogICJwb2xpY3lfaWRzX21hdGNoZWQiOiBbCiAgICB7CiAgICAgICJpZCI6ICJjN2M0OWRkMi1hOTZhLTQzYmQtOGNlZS1mMmFhOTk1MDM0NTgiLAogICAgICAidmVyc2lvbiI6ICJ2NCIKICAgIH0KICBdLAogICJwb2xpY3lfZGVmaW5lZF9jbGFpbXMiOiB7fSwKICAiYXR0ZXN0ZXJfdGNiX3N0YXR1cyI6ICJPVVRfT0ZfREFURSIsCiAgImF0dGVzdGVyX2Fkdmlzb3J5X2lkcyI6IFsKICAgICJJTlRFTC1TQS0wMDU4NiIsCiAgICAiSU5URUwtU0EtMDA2MTQiLAogICAgIklOVEVMLVNBLTAwNjE1IiwKICAgICJJTlRFTC1TQS0wMDY1NyIsCiAgICAiSU5URUwtU0EtMDA3MzAiLAogICAgIklOVEVMLVNBLTAwNzM4IiwKICAgICJJTlRFTC1TQS0wMDc2NyIKICBdLAogICJhdHRlc3Rlcl90eXBlIjogIlNHWCIsCiAgInZlcmlmaWVyX2luc3RhbmNlX2lkcyI6IFsKICAgICI2MDVhMWZiNC00ODMxLTQ4N2ItOTQyMi05ODBjMTZhZTA1ODUiLAogICAgIjA4Njk2ZmQ5LWM1NDQtNDk3Yi1iZjZmLTkxM2VmZmRmYTU3OSIsCiAgICAiNjU3ZWNiMGItNTY1My00ZGViLTg0OGItNzFkZjI2ZjhlOTA3IiwKICAgICIyNDA0MjZmYS1kMzdhLTRkZGUtOGUzNy1lYTIzNmM5Yzk2MWEiCiAgXSwKICAiZGJnc3RhdCI6ICJkaXNhYmxlZCIsCiAgImVhdF9wcm9maWxlIjogImh0dHBzOi8vLi4uL2VhdF9wcm9maWxlIiwKICAiaW50dXNlIjogImdlbmVyaWMiLAogICJ2ZXIiOiAiMS4wLjAiLAogICJleHAiOiAxNjkyMzc2MjQyLAogICJqdGkiOiAiMGMxYjNkZTctMjQ4Ny00ODVmLTlmN2ItMDY2ZTI5OWQ4M2ZjIiwKICAiaWF0IjogMTY5MjM3NTk0MiwKICAiaXNzIjogIkludGVsIFRydXN0IEF1dGhvcml0eSIsCiAgIm5iZiI6IDE2OTIzNzU5NDIKfQ";
      const expectedOutput = "0x" + crypto.createHash("sha384").update(input).digest().toString("hex");
      const output = await this.hasher(input);
      expect(output).to.equal(expectedOutput);
    });

    it("Measure the gas consumption of the single block of hashing", async function () {
      const input = "";
      const hexStr = Buffer.from(input, "utf-8").toString("hex");
      await this.tester.connect(this.signers.admin).sha384Gas("0x" + hexStr);
      expect(0).to.equal(0);
    });

    it("Measure the gas consumption of the sha256for a sample of JWT claims", async function () {
      const input =
        "ewogICJhbGciOiAiUFMzODQiLAogICJqa3UiOiAiaHR0cHM6Ly8uLi4vY2VydHMiLAogICJraWQiOiAiMTg4MWY1MTk5NDg2MjFmNy4uLiIsCiAgInR5cCI6ICJKV1QiCn0KLgp7CiAgInNneF9tcmVuY2xhdmUiOiAiYWI5OTg5ZjFjNGMxZmZhMy4uLiIsCiAgInNneF9tcnNpZ25lciI6ICI3ZjRlOGFkYmMxZDhkYTdhZS4uLiIsCiAgInNneF9pc3Zwcm9kaWQiOiAxLAogICJzZ3hfaXN2c3ZuIjogMSwKICAic2d4X3JlcG9ydF9kYXRhIjogIjcxOTIzODVjM2MwNjA1Li4uIiwKICAic2d4X2lzX2RlYnVnZ2FibGUiOiBmYWxzZSwKICAic2d4X2NvbGxhdGVyYWwiOiB7CiAgICAicWVpZGNlcnRoYXNoIjogImIyY2E3MWI4ZTg0OS4uLiIsCiAgICAicWVpZGNybGhhc2giOiAiZjQ1NGRjMWI5YmQ0Yy4uLiIsCiAgICAicWVpZGhhc2giOiAiZDg2MmNhYjMzMmI5NmE3ZmIuLi4iLAogICAgInF1b3RlaGFzaCI6ICJlMzZiM2RmNmZkM2QxLi4uIiwKICAgICJ0Y2JpbmZvY2VydGhhc2giOiAiYjJjYTcxYjhlODQ5ZDUuLi4iLAogICAgInRjYmluZm9jcmxoYXNoIjogImY0NTRkYzFiOWJkNGNlMy4uLiIsCiAgICAidGNiaW5mb2hhc2giOiAiZGM4MDBmMTY4YzUyOGFmLi4uIgogIH0sCiAgImF0dGVzdGVyX2hlbGRfZGF0YSI6ICJTblZ6ZENCemIyMWxJSFJsYzNRZ1ouLi4iLAogICJwb2xpY3lfaWRzX21hdGNoZWQiOiBbCiAgICB7CiAgICAgICJpZCI6ICJjN2M0OWRkMi1hOTZhLTQzYmQtOGNlZS1mMmFhOTk1MDM0NTgiLAogICAgICAidmVyc2lvbiI6ICJ2NCIKICAgIH0KICBdLAogICJwb2xpY3lfZGVmaW5lZF9jbGFpbXMiOiB7fSwKICAiYXR0ZXN0ZXJfdGNiX3N0YXR1cyI6ICJPVVRfT0ZfREFURSIsCiAgImF0dGVzdGVyX2Fkdmlzb3J5X2lkcyI6IFsKICAgICJJTlRFTC1TQS0wMDU4NiIsCiAgICAiSU5URUwtU0EtMDA2MTQiLAogICAgIklOVEVMLVNBLTAwNjE1IiwKICAgICJJTlRFTC1TQS0wMDY1NyIsCiAgICAiSU5URUwtU0EtMDA3MzAiLAogICAgIklOVEVMLVNBLTAwNzM4IiwKICAgICJJTlRFTC1TQS0wMDc2NyIKICBdLAogICJhdHRlc3Rlcl90eXBlIjogIlNHWCIsCiAgInZlcmlmaWVyX2luc3RhbmNlX2lkcyI6IFsKICAgICI2MDVhMWZiNC00ODMxLTQ4N2ItOTQyMi05ODBjMTZhZTA1ODUiLAogICAgIjA4Njk2ZmQ5LWM1NDQtNDk3Yi1iZjZmLTkxM2VmZmRmYTU3OSIsCiAgICAiNjU3ZWNiMGItNTY1My00ZGViLTg0OGItNzFkZjI2ZjhlOTA3IiwKICAgICIyNDA0MjZmYS1kMzdhLTRkZGUtOGUzNy1lYTIzNmM5Yzk2MWEiCiAgXSwKICAiZGJnc3RhdCI6ICJkaXNhYmxlZCIsCiAgImVhdF9wcm9maWxlIjogImh0dHBzOi8vLi4uL2VhdF9wcm9maWxlIiwKICAiaW50dXNlIjogImdlbmVyaWMiLAogICJ2ZXIiOiAiMS4wLjAiLAogICJleHAiOiAxNjkyMzc2MjQyLAogICJqdGkiOiAiMGMxYjNkZTctMjQ4Ny00ODVmLTlmN2ItMDY2ZTI5OWQ4M2ZjIiwKICAiaWF0IjogMTY5MjM3NTk0MiwKICAiaXNzIjogIkludGVsIFRydXN0IEF1dGhvcml0eSIsCiAgIm5iZiI6IDE2OTIzNzU5NDIKfQ";
      const hexStr = Buffer.from(input, "utf-8").toString("hex");
      await this.tester.connect(this.signers.admin).sha256Gas("0x" + hexStr);
      expect(0).to.equal(0);
    });

    it("Measure the gas consumption of the sha384 for a sample of JWT claims", async function () {
      const input =
        "ewogICJhbGciOiAiUFMzODQiLAogICJqa3UiOiAiaHR0cHM6Ly8uLi4vY2VydHMiLAogICJraWQiOiAiMTg4MWY1MTk5NDg2MjFmNy4uLiIsCiAgInR5cCI6ICJKV1QiCn0KLgp7CiAgInNneF9tcmVuY2xhdmUiOiAiYWI5OTg5ZjFjNGMxZmZhMy4uLiIsCiAgInNneF9tcnNpZ25lciI6ICI3ZjRlOGFkYmMxZDhkYTdhZS4uLiIsCiAgInNneF9pc3Zwcm9kaWQiOiAxLAogICJzZ3hfaXN2c3ZuIjogMSwKICAic2d4X3JlcG9ydF9kYXRhIjogIjcxOTIzODVjM2MwNjA1Li4uIiwKICAic2d4X2lzX2RlYnVnZ2FibGUiOiBmYWxzZSwKICAic2d4X2NvbGxhdGVyYWwiOiB7CiAgICAicWVpZGNlcnRoYXNoIjogImIyY2E3MWI4ZTg0OS4uLiIsCiAgICAicWVpZGNybGhhc2giOiAiZjQ1NGRjMWI5YmQ0Yy4uLiIsCiAgICAicWVpZGhhc2giOiAiZDg2MmNhYjMzMmI5NmE3ZmIuLi4iLAogICAgInF1b3RlaGFzaCI6ICJlMzZiM2RmNmZkM2QxLi4uIiwKICAgICJ0Y2JpbmZvY2VydGhhc2giOiAiYjJjYTcxYjhlODQ5ZDUuLi4iLAogICAgInRjYmluZm9jcmxoYXNoIjogImY0NTRkYzFiOWJkNGNlMy4uLiIsCiAgICAidGNiaW5mb2hhc2giOiAiZGM4MDBmMTY4YzUyOGFmLi4uIgogIH0sCiAgImF0dGVzdGVyX2hlbGRfZGF0YSI6ICJTblZ6ZENCemIyMWxJSFJsYzNRZ1ouLi4iLAogICJwb2xpY3lfaWRzX21hdGNoZWQiOiBbCiAgICB7CiAgICAgICJpZCI6ICJjN2M0OWRkMi1hOTZhLTQzYmQtOGNlZS1mMmFhOTk1MDM0NTgiLAogICAgICAidmVyc2lvbiI6ICJ2NCIKICAgIH0KICBdLAogICJwb2xpY3lfZGVmaW5lZF9jbGFpbXMiOiB7fSwKICAiYXR0ZXN0ZXJfdGNiX3N0YXR1cyI6ICJPVVRfT0ZfREFURSIsCiAgImF0dGVzdGVyX2Fkdmlzb3J5X2lkcyI6IFsKICAgICJJTlRFTC1TQS0wMDU4NiIsCiAgICAiSU5URUwtU0EtMDA2MTQiLAogICAgIklOVEVMLVNBLTAwNjE1IiwKICAgICJJTlRFTC1TQS0wMDY1NyIsCiAgICAiSU5URUwtU0EtMDA3MzAiLAogICAgIklOVEVMLVNBLTAwNzM4IiwKICAgICJJTlRFTC1TQS0wMDc2NyIKICBdLAogICJhdHRlc3Rlcl90eXBlIjogIlNHWCIsCiAgInZlcmlmaWVyX2luc3RhbmNlX2lkcyI6IFsKICAgICI2MDVhMWZiNC00ODMxLTQ4N2ItOTQyMi05ODBjMTZhZTA1ODUiLAogICAgIjA4Njk2ZmQ5LWM1NDQtNDk3Yi1iZjZmLTkxM2VmZmRmYTU3OSIsCiAgICAiNjU3ZWNiMGItNTY1My00ZGViLTg0OGItNzFkZjI2ZjhlOTA3IiwKICAgICIyNDA0MjZmYS1kMzdhLTRkZGUtOGUzNy1lYTIzNmM5Yzk2MWEiCiAgXSwKICAiZGJnc3RhdCI6ICJkaXNhYmxlZCIsCiAgImVhdF9wcm9maWxlIjogImh0dHBzOi8vLi4uL2VhdF9wcm9maWxlIiwKICAiaW50dXNlIjogImdlbmVyaWMiLAogICJ2ZXIiOiAiMS4wLjAiLAogICJleHAiOiAxNjkyMzc2MjQyLAogICJqdGkiOiAiMGMxYjNkZTctMjQ4Ny00ODVmLTlmN2ItMDY2ZTI5OWQ4M2ZjIiwKICAiaWF0IjogMTY5MjM3NTk0MiwKICAiaXNzIjogIkludGVsIFRydXN0IEF1dGhvcml0eSIsCiAgIm5iZiI6IDE2OTIzNzU5NDIKfQ";
      const hexStr = Buffer.from(input, "utf-8").toString("hex");
      await this.tester.connect(this.signers.admin).sha384Gas("0x" + hexStr);
      expect(0).to.equal(0);
    });
  });
});
