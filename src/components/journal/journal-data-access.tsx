'use client'

import { getJournalProgram, getJournalProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../use-transaction-toast'
import { toast } from 'sonner'

interface CreateJournalEntryArgs {
  owner: PublicKey,
  title: string
  message: string
}
interface UpdateJournalEntryArgs {
  owner: PublicKey,
  title: string
  message: string
}
interface DeleteJournalEntryArgs {
  owner: PublicKey,
  title: string
}

export function useJournalProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getJournalProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getJournalProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['journal', 'all', { cluster }],
    queryFn: () => program.account.journalState.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createJournalEntry = useMutation<string, Error, CreateJournalEntryArgs>({
    mutationKey: ['journal', 'create', { cluster }],
    mutationFn: async({ owner, title, message }) =>{
      return program.methods
        .createJournalEntry(title, message)
        .accounts({
          owner: owner
        })
        .rpc()
      },
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: (error) => {
      console.log("Err: ", error);
      toast.error('Failed to create journal entry.')
    },
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createJournalEntry,
  }
}

export function useJournalProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useJournalProgram()

  const accountQuery = useQuery({
    queryKey: ['journal', 'fetch', { cluster, account }],
    queryFn: () => program.account.journalState.fetch(account),
  })

  const updateJournalEntry = useMutation<string, Error, UpdateJournalEntryArgs>({
    mutationKey: ['journal', 'update', { cluster, account }],
    mutationFn: ({ title, message, owner }) => {
      return program.methods
        .updateJournalEntry(title, message)
        .accounts({
          owner: owner
        })
        .rpc()
    },
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
    onError: (error) => {
      toast.error(`Failed to update journal entry: ${error.message}`);
    }
  })

  const deleteJournalEntry = useMutation<string, Error, DeleteJournalEntryArgs>({
    mutationKey: ['journal', 'delete', { cluster, account }],
    mutationFn: ({title}) => program.methods.deleteJournalEntry(title).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    updateJournalEntry,
    deleteJournalEntry
  }
}
