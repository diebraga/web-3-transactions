import { FC } from "react";
import { useTransactions } from "../hooks/useTransaction";
import { transactionMock } from "../utils/transactionsMock";
import TransactionsCard from "./TransactionsCard";

export const Transactions: FC = () => {
  const { currAccount } = useTransactions();

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currAccount ? (
          <h3 className="text-gray-800 text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-gray-800 text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactionMock.reverse().map((transaction) => (
            <TransactionsCard
              key={transaction.id}
              {...transaction}
              keyword=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};
