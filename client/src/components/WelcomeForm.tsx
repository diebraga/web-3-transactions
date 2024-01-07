import { FC, FormEvent } from "react";
import { Button, FormInput, Loader } from ".";
import { useTransactions } from "../hooks/useTransaction";
import { Alert } from "./Alert";
import { AlertType } from "../@types";
import { IoInformationCircleOutline } from "react-icons/io5";

type WelcomeFormProps = {
  handleSubmit: (e: FormEvent) => void;
};

export const WelcomeForm: FC<WelcomeFormProps> = ({ handleSubmit }) => {
  const {
    formData,
    isLoading,
    handleChange,
    currNetwork,
    toggleAlertNetwork,
    isAlertNetworkShowing,
  } = useTransactions();
  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      <FormInput
        placeholder="Address To"
        name="addressTo"
        type="text"
        handleChange={handleChange}
        value={formData.addressTo}
      />
      <FormInput
        placeholder="Amount (ETH)"
        name="amount"
        type="number"
        handleChange={handleChange}
        value={formData.amount}
      />
      <FormInput
        placeholder="Keyword (Gif)"
        name="keyword"
        type="text"
        handleChange={handleChange}
        value={formData.keyword}
      />
      <FormInput
        placeholder="Enter Message"
        name="message"
        type="text"
        handleChange={handleChange}
        value={formData.message}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <Button
          type="button"
          onClick={handleSubmit}
          className="mt-2 font-semibold w-full py-2 px-7 mx-4"
        >
          Send now
        </Button>
      )}
      <Alert
        type={AlertType.Info}
        content={`Network: ${currNetwork}`}
        onClose={toggleAlertNetwork}
        isVisible={isAlertNetworkShowing}
        icon={<IoInformationCircleOutline />}
      />
    </div>
  );
};
