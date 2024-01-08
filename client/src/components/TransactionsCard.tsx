import { FC } from 'react';
import { truncateString } from '../utils/truncateString';
import { useFetch } from '../hooks/useFetch';

type TransactionsCardProps = {
    addressTo: string;
    addressFrom: string;
    timestamp: string;
    message?: string;
    keyword: string;
    amount: string;
    url: string;
  };
  
const TransactionsCard: FC<TransactionsCardProps> = (props) => {
  const gifUrl = useFetch({ keyword: props.keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${props.addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {truncateString(props.addressFrom, 20)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${props.addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {truncateString(props.addressTo, 20)}</p>
          </a>
          <p className="text-white text-base">Amount: {props.amount} ETH</p>
          {props.message && (
            <>
              <br />
              <p className="text-white text-base">Message: {props.message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl || props.url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{props.timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsCard;
