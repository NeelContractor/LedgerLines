'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { JournalList } from './journal-ui'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { ThemeSelect } from '../theme-select'
import Link from 'next/link'

export default function JournalFeature() {
  const { publicKey } = useWallet()

  return publicKey ? (
    <div>
      {/* <AppHero
        title="LedgerLines"
        subtitle={
          'Create a new Journal entry by clicking the "Create" button. The state of a account is stored on-chain.'
        }
      >
        <JournalCreate />
      </AppHero> */}
      <div className='flex justify-between'>
        <Link href={"/"}>
          <h1 className='text-2xl font-mono'>LedgerLines</h1>
        </Link>
        <div className='flex justify-center'>
          <div className='content-center'>
            <ThemeSelect />
          </div>
          <div className='pl-1'>
            <WalletMultiButton />
          </div>
        </div>
      </div>
      <div className='my-20'>
        <JournalList />
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
