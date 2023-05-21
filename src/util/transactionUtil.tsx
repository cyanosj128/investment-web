import { FullTransaction, TransactionMethod } from '@/models/Transaction';
import { Tag } from 'antd';
import { ColorConstant } from '../constants';
import { ONE_DAY_SECONDS } from '../constants';
import Big from 'big.js';

export const TransactionUtil = {
  getRetentionDays(from: number, to: number) {
    return Math.floor((to - from) / ONE_DAY_SECONDS) + 1;
  },
  getTransactionMethodTag(txMethod: TransactionMethod) {
    if (txMethod === 'BUY') {
      return <Tag color={ColorConstant.BUY}>매수</Tag>;
    } else {
      return <Tag color={ColorConstant.SELL}>매도</Tag>;
    }
  },
  getHoldingQuantity(quantities: number[]) {
    return quantities.reduce((a, b) => a + b, 0);
  },
  getIsHolding(quantities: number[]) {
    return TransactionUtil.getHoldingQuantity(quantities) > 0;
  },
  getRetentionCount(quantities: number[]) {
    let count = 0;
    let retentionCount = 0;
    quantities.forEach((q) => {
      count += q;
      if (count === 0) {
        retentionCount++;
      }
    });

    return count === 0 ? retentionCount : retentionCount + 1;
  },
  getAverageAmount(txs: Omit<FullTransaction, 'item'>[]) {
    let quantity = 0;
    let amount = 0;
    for (const tx of txs) {
      quantity += parseFloat(tx.quantity);
      amount += parseFloat(tx.amount);
    }

    return (amount / quantity).toFixed(2);
  },
  getHoldingHistories(transactions: Omit<FullTransaction, 'item'>[]) {
    const holdingHistories: Omit<FullTransaction, 'item'>[][] = [];

    let count = new Big(0);
    let index = -1;
    for (const tx of transactions) {
      if (count.toNumber() === 0) {
        index++;
        holdingHistories.push([]);
      }

      const bigQuantity = new Big(tx.quantity);

      if (tx.method === 'BUY') {
        count = count.add(bigQuantity);
      } else {
        count = count.minus(bigQuantity);
      }
      holdingHistories[index].push(tx);
    }

    return holdingHistories;
  },
};
