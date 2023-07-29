import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  notification?: boolean;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href,
  icon: Icon,
  active,
  notification,
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} key={label}>
      <Link
        href={href}
        className={clsx(
          `group flex gap-x-3 relative rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
          active && "bg-gray-100 text-black"
        )}
      >
        <Icon className=" h-6 w-6 shrink-0" aria-hidden="true" />
        {notification && (
          <span className="absolute block rounded-full bg-red-500 top-1 right-0 h-2 w-2 md:h-3 md:w-3" />
        )}
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;
