import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProivder } from "./app/contextApi";
import Button from "./Button";
import { darkModeColor, defaultColor } from "./colors";
import InputName from "./InputName";
import { faClose } from "@fortawesome/free-solid-svg-icons";

interface DataFormModalProps {
  isOpen: boolean;
  FormTitle: string;
  className?: string;
  textValue?: string;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

export default function DataFormModal({
  FormTitle,
  className = "",
  isOpen,
  textValue,
  onClose,
  onChange,
  onClick,
}: DataFormModalProps) {
  const defaultClasses = `top-[6%] left-1/2 transform -translate-x-1/2 w-[80%] z-50 p-10 rounded-md shadow-md absolute`;
  const {
    darkModeObject: { isDarkMode },
  } = useGlobalContextProivder();
  return (
    <>
      {isOpen && (
        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.background
              : defaultColor.background,
            color: isDarkMode
              ? darkModeColor.textColor
              : defaultColor.textColor,
          }}
          className={`${defaultClasses} ${className}`}
        >
          <Header FormTitle={FormTitle} onClose={onClose} />
          <div className="w-full">
            <InputName
              inputlabel="Area Name"
              placeholder="Type a name for the area..."
              onChange={onChange}
              value={textValue}
            />
          </div>
          <Button
            onClick={onClick}
            className="bg-customRed text-white mt-10 p-3 px-6"
          >
            {FormTitle === "Add New Area"?"Add New Area" :"Edit Area"}
          </Button>
        </div>
      )}
    </>
  );
}

function Header({
  FormTitle,
  onClose,
}: {
  FormTitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-bold text-xl">{FormTitle}</span>
      <button onClick={onClose} className="text-gray-800 hover:text-gray-500">
        <FontAwesomeIcon
          height={20}
          width={20}
          className={`absolute top-8 right-4 text-gray-300 cursor-pointer`}
          icon={faClose}
        />
      </button>
    </div>
  );
}
