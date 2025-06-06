// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import JournalIDL from '../target/idl/journal.json'
import type { Journal } from '../target/types/journal'

// Re-export the generated IDL and type
export { Journal, JournalIDL }

// The programId is imported from the program IDL.
export const JOURNAL_PROGRAM_ID = new PublicKey(JournalIDL.address)

// This is a helper function to get the Counter Anchor program.
export function getJournalProgram(provider: AnchorProvider, address?: PublicKey): Program<Journal> {
  return new Program({ ...JournalIDL, address: address ? address.toBase58() : JournalIDL.address } as Journal, provider)
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getJournalProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('3hYoUdTUoGdtcLjhwALWqG5m5Lx6RWWyEPLSwPGwpFhy')
    case 'mainnet-beta':
    default:
      return JOURNAL_PROGRAM_ID
  }
}
