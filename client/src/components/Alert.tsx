import { FC } from "react";
import { AlertType } from "../@types";

type AlertProps = {
  type: AlertType;
  content?: string;
  onClose: () => void;
  isVisible: boolean;
};

export const Alert: FC<AlertProps> = ({
  type,
  content,
  onClose,
  isVisible,
}) => {
  const defineIcon = () => {
    if (type === AlertType.Info) {
      return {
        color: "bg-blue-100 border border-blue-400 text-blue-700",
        icon: (
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
        ),
      };
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className={`${
            defineIcon()?.color
          } px-4 py-3 rounded relative mt-2 flex w-full justify-between items-center`}
          role="alert"
        >
          <div className="flex items-center">
            {defineIcon()?.icon}
            <span className="text-xs">{content}</span>
          </div>
          <span onClick={onClose}>
            <svg
              className={`fill-current h-6 w-6 ${
                defineIcon()?.color.split(" ")[0]
              }`}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};