import { FC, ReactNode } from "react";
import { AlertType } from "../@types";

type AlertProps = {
  type: AlertType;
  content?: string;
  onClose: () => void;
  isVisible: boolean;
  icon?: ReactNode;
};

export const Alert: FC<AlertProps> = ({
  type,
  content,
  onClose,
  isVisible,
  icon,
}) => {
  const color = `bg-${type}-100 border border-${type}-400 text-${type}-700`;

  return (
    <>
      {isVisible && (
        <div
          className={`${color} px-4 py-3 rounded relative mt-2 flex w-full justify-between items-center`}
          role="alert"
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-xs">{content}</span>
          </div>
          <span onClick={onClose}>
            <svg
              className={`fill-current h-6 w-6 ${color.split(" ")[0]}`}
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
