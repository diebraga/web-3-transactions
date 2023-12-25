import { FC } from "react";
import { Button, FormInput, Loader } from ".";

type WelcomeFormProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
  handleSubmit: () => void;
};
export const WelcomeForm: FC<WelcomeFormProps> = ({
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
      <FormInput
        placeholder="Address To"
        name="addressTo"
        type="text"
        handleChange={handleChange}
      />
      <FormInput
        placeholder="Amount (ETH)"
        name="amount"
        type="number"
        handleChange={handleChange}
      />
      <FormInput
        placeholder="Keyword (Gif)"
        name="keyword"
        type="text"
        handleChange={handleChange}
      />
      <FormInput
        placeholder="Enter Message"
        name="message"
        type="text"
        handleChange={handleChange}
      />
      {!true ? (
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
    </div>
  );
};
