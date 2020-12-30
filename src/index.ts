import * as CryptoJS from "crypto-js";

class Block {
  // static method : 클래스가 생성되지 않아도 호출할 수 있음
  static calculateBlockHash = (
    index: number,
    prevHash: string,
    data: string,
    timestamp: number
  ): string => CryptoJS.SHA256(index + prevHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.prevHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public prevHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    prevHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.prevHash = prevHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "12323", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const prevBlock: Block = getLatestBlock();
  const newIndex: number = prevBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    prevBlock.hash,
    data,
    newTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    prevBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.prevHash,
    aBlock.data,
    aBlock.timestamp
  );

const isBlockValid = (candidateBlock: Block, prevBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    // 구조 검증
    return false;
  } else if (prevBlock.index + 1 !== candidateBlock.index) {
    // 인덱스 검증
    return false;
  } else if (prevBlock.hash !== candidateBlock.prevHash) {
    // 연결되어있는지 검증
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    // 해쉬값이 타당한지 검증
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    console.log("block added!");
    blockchain.push(candidateBlock);
  }
};

createNewBlock("2nd block");
createNewBlock("3rd block");
createNewBlock("4th block");

console.log(blockchain);

export {};
