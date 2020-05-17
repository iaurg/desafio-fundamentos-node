import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string,
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((accumulator, transaction: Transaction) => transaction.type === 'income' ? accumulator + transaction.value : accumulator, 0);

    const outcome = this.transactions.reduce((accumulator, transaction: Transaction) => transaction.type === 'outcome' ? accumulator + transaction.value : accumulator, 0);

    const total = income - outcome

    const balance = {
      income,
      outcome,
      total
    }

    return balance
  }

  public create({ title, type, value }:CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type})
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
