import React from "react";
import {
  TransactionInstruction,
  SignatureResult,
  StakeInstruction,
  StakeProgram
} from "@solana/web3.js";
import { lamportsToSolString } from "utils";
import { displayAddress } from "utils/tx";
import { InstructionCard } from "../InstructionCard";
import Copyable from "components/Copyable";
import { UnknownDetailsCard } from "../UnknownDetailsCard";

export function WithdrawDetailsCard(props: {
  ix: TransactionInstruction;
  index: number;
  result: SignatureResult;
}) {
  const { ix, index, result } = props;

  let params;
  try {
    params = StakeInstruction.decodeWithdraw(ix);
  } catch (err) {
    console.error(err);
    return <UnknownDetailsCard {...props} />;
  }

  const stakePubkey = params.stakePubkey.toBase58();
  const toPubkey = params.toPubkey.toBase58();
  const authorizedPubkey = params.authorizedPubkey.toBase58();

  return (
    <InstructionCard
      ix={ix}
      index={index}
      result={result}
      title="Withdraw Stake"
    >
      <tr>
        <td>Program</td>
        <td className="text-right">
          <Copyable bottom right text={StakeProgram.programId.toBase58()}>
            <code>{displayAddress(StakeProgram.programId.toBase58())}</code>
          </Copyable>
        </td>
      </tr>

      <tr>
        <td>Stake Address</td>
        <td className="text-right">
          <Copyable right text={stakePubkey}>
            <code>{stakePubkey}</code>
          </Copyable>
        </td>
      </tr>

      <tr>
        <td>Authority Address</td>
        <td className="text-right">
          <Copyable right text={authorizedPubkey}>
            <code>{authorizedPubkey}</code>
          </Copyable>
        </td>
      </tr>

      <tr>
        <td>To Address</td>
        <td className="text-right">
          <Copyable right text={toPubkey}>
            <code>{toPubkey}</code>
          </Copyable>
        </td>
      </tr>

      <tr>
        <td>Withdraw Amount (SOL)</td>
        <td className="text-right">{lamportsToSolString(params.lamports)}</td>
      </tr>
    </InstructionCard>
  );
}
