import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from '@/configs/firebase'
import type { ICreateTransactionEntity } from '@/domain/transaction/entity'

export const getTransactions = async () => {
  const transactions = await getDocs(collection(db, 'transactions'))
  return transactions
}

export const createTransaction = async (data: ICreateTransactionEntity) => {
  const docRef = await addDoc(collection(db, 'transactions'), data)
  return docRef
}

export const deleteTransaction = async (id: string) => {
  await deleteDoc(doc(db, 'transactions', id))
}
