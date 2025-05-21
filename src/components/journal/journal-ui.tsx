'use client'

import { PublicKey } from '@solana/web3.js'
import { useMemo, useState } from 'react'
import { useJournalProgram, useJournalProgramAccount } from './journal-data-access'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { useWallet } from '@solana/wallet-adapter-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useTheme } from 'next-themes'
import Image from 'next/image'

// TODO: add logic to show user there own entry

export function JournalCreate() {
  const { createJournalEntry } = useJournalProgram()

  return (
    <Button  disabled={createJournalEntry.isPending}>
      Create {createJournalEntry.isPending && '...'}
    </Button>
  )
}

export function JournalList() {
  const { accounts, getProgramAccount } = useJournalProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }
  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid mx-72 gap-4">
          <div className='flex justify-center'>
            <Avatar className='w-24 h-24'>
              <AvatarImage  src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex justify-center'>
            <CreateJournalEntryButton />
          </div>
          {accounts.data?.map((account) =>
            <JournalCard key={account.publicKey.toString()} account={account.publicKey} />
          )}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No Journal Entry found.</h2>
          <p>Please create one by click Create Entry Button.</p>
          <div className='flex justify-center'>
            <CreateJournalEntryButton />
          </div>
        </div>
      )}
    </div>
  )
}

function CreateJournalEntryButton() {
  const { publicKey } = useWallet();
  const { createJournalEntry } = useJournalProgram();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const isFormValid = title.trim() !== "" && message.trim() !== "";

  const handleOnCreate = async () => {
    if (publicKey && isFormValid) {
      await createJournalEntry.mutateAsync({ title, message, owner: publicKey });
      setTitle("")
      setMessage("")
    }
  }
  
  return <div>
    <Dialog>
      <DialogTrigger className={` bg-purple-500 text-white  py-2 px-3 rounded-lg hover:bg-gray-300 mt-10`}>Create Entry</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Journal Entry</DialogTitle>
          <Input 
            maxLength={32}
            className='my-3'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            placeholder='Journal Entry Title'
          />
          <Textarea
            className='my-3 h-56'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            placeholder='Journal Entry Description'
          />
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="submit"
            onClick={() => {
              handleOnCreate()
            }}
            disabled={createJournalEntry.isPending || !isFormValid}
          >Create {createJournalEntry.isPending && "..." }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}

function UpdateJournalEntryButton({ account, entry }: { account: PublicKey, entry:{
    owner: PublicKey;
    title: string;
    message: string;
} }) {
  const { publicKey } = useWallet();
  const { updateJournalEntry } = useJournalProgramAccount({account});
  const [message, setMessage] = useState("");

  const isFormValid = entry.title.trim() !== "" && message.trim() !== "";

  const handleOnUpdate = async () => {
    if (publicKey && isFormValid) {
      await updateJournalEntry.mutateAsync({ title: entry.title, message, owner: publicKey });
      setMessage("");
    }
  }
  return <div>
    <Dialog>
      <DialogTrigger className='col-span-1 justify-center content-center rounded-lg bg-white py-2 px-4 hover:bg-gray-300'>
        {/* <Button
            className={`bg-white `}
          > */}
            <Image src={"/edit.png"} alt='Edit' width={20} height={20} />
          {/* </Button> */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Journal Entry</DialogTitle>
          <DialogDescription>You can only change Description of the Journal entry.</DialogDescription>
          <Input 
            className='my-3'
            disabled={true}
            placeholder={entry.title}
          />
          <Textarea
            className='my-3 h-56'
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
            placeholder='Journal Entry Description'
          />
        </DialogHeader>
        <DialogFooter>
          <Button 
            type="submit"
            onClick={() => {
              handleOnUpdate()
            }}
            disabled={updateJournalEntry.isPending || !isFormValid}
          >Update {updateJournalEntry.isPending && "..." }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
}

function JournalCard({ account }: { account: PublicKey }) {
  const { theme } = useTheme();
  const { publicKey } = useWallet();
  const { accountQuery, deleteJournalEntry } = useJournalProgramAccount({
    account,
  })
  const [isDisplay, setIsDisplay] = useState(false);

  const entry = useMemo(() => accountQuery.data ?? 0, [accountQuery.data]);

  const handleOnDelete = () => {
    if (publicKey && entry) {
      deleteJournalEntry.mutateAsync({ title: entry.title, owner: publicKey });
    }
  }

  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
      <div className={`grid grid-cols-10 border  ${theme == "dark" ? "bg-[#282828] hover:bg-[#2b2b2b]" : "bg-gray-300 hover-gray-500"} rounded-lg p-3 `}>
        <div className={`col-span-1 border border-none bg-gradient-to-l from-purple-500 to-pink-500 rounded-lg text-lg font-bold text-center content-center`}>
          {entry == 0 ? "J" : entry.title?.trim()?.charAt(0)} {/* just return first letter of the title */}
        </div>
        <div className='pl-4 col-span-6 wrap-break-word'>
          {isDisplay == false ? (
            <>
              <h1 className='line-clamp-1'>{entry == 0 ? "" : entry.title}</h1>
              <h5 className='line-clamp-1 text-gray-400 '>{entry == 0 ? "" : entry.message}</h5>
            </>
          ) : (
            null
          )}
        </div>
        <div className='col-span-1 justify-center content-center'>
          <Button
            className={`${theme == "dark" ? "text-black bg-white" : "text-black bg-white"}`}
            onClick={() => {
              setIsDisplay((prev) => !prev)
            }}
          >
            {isDisplay == false ? <h1 className='text-black'>View</h1> : <h1 className='text-black'>Unview</h1>}
          </Button>
        </div>
        <div className='col-span-1 justify-center content-center'>
          {/* <Button
            className={`bg-white`}
          >
            <Image src={"/edit.png"} alt='Edit' width={20} height={20} />
          </Button> */}
          {entry !== 0 && (
            <UpdateJournalEntryButton account={account} entry={entry} />
          )}
        </div>
        <div className='col-span-1 justify-center content-center'>
          <Button
            className={`bg-white`}
            onClick={() => {
              handleOnDelete()
            }}
          >
            <Image src={"/delete.png"} alt='Delete' width={20} height={20} />
          </Button>
        </div>
        {isDisplay == true ? (
          <div className='grid col-span-10 justify-center py-5'>
            <h1 className='text-center text-2xl'>{entry == 0 ? "" : entry.title}</h1>
            <h5 className='text-lg text-left pt-3'>{entry == 0 ? "" : entry.message}</h5>
          </div>
        ) : (
          <></>
        )}
      </div>
  )
}
