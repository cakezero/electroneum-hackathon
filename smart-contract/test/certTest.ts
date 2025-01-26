import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Certificate Test", function () {
  async function deployCertificate() {
    const NFT_NAME = "Test Certificate";
    const SYMBOL = "TSC";

    const [owner, secondAccount, thirdAccount] =
      await hre.viem.getWalletClients();

    const cert = await hre.viem.deployContract("CertNFT", [NFT_NAME, SYMBOL]);

    const publicClient = await hre.viem.getPublicClient();

    return {
      owner,
      secondAccount,
      thirdAccount,
      cert,
      publicClient,
      NFT_NAME,
      SYMBOL,
    };
  }

  describe("Interactions", function () {
    it("Should allow users to mint", async function () {
      const { cert, secondAccount, thirdAccount } = await loadFixture(
        deployCertificate
      );
      const certSecondAccount = await hre.viem.getContractAt(
        "CertNFT",
        cert.address,
        { client: { wallet: secondAccount } }
      );
      const certThirdAccount = await hre.viem.getContractAt(
        "CertNFT",
        cert.address,
        { client: { wallet: thirdAccount } }
      );
      await certSecondAccount.write.mint();
      await certThirdAccount.write.mint();

      expect(await certSecondAccount.read.currentTokenId()).to.equal(2n);
    });

    it("Should allow owner to setBaseURI", async function () {
      const { cert } = await loadFixture(deployCertificate);
      const certAccount = await hre.viem.getContractAt("CertNFT", cert.address);
      await certAccount.write.setBaseURI(["owner URI"]);
      expect(await certAccount.read.baseURI()).to.equal("owner URI");
    });

    it("Should fail if non owner try to access setBaseURI", async function () {
      const { secondAccount, cert } = await loadFixture(deployCertificate);
      const certOtherAccount = await hre.viem.getContractAt(
        "CertNFT",
        cert.address,
        { client: { wallet: secondAccount } }
      );
      await expect(
        certOtherAccount.write.setBaseURI(["dummy url"])
      ).to.be.rejectedWith("You can't perform this operation");
    });
  });
});
