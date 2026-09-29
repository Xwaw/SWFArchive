import type { FC, HTMLAttributes, ReactNode } from "react";

interface DropListProps {
  children: ReactNode;
}

interface DropListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

type DropListComponent = FC<DropListProps> & {
  Item: FC<DropListItemProps>;
  Separator: FC;
};

const DropList: DropListComponent = ({ children }) => {
  return (
    <div
      className="
        min-w-35
        border-2
        border-[#383838]
        flex
        flex-col
        p-1
        select-none
      "
      style={{
        background: `
          linear-gradient(
            to right,
            #777777 0%,
            #777777 35%,
            #505050 70%,
            #686868 100%
          )
        `,
        boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.6)",
      }}
    >
      {children}
    </div>
  );
};

DropList.Item = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`
        w-full
        p-1
        bg-transparent
        cursor-pointer
        select-none

        hover:bg-[linear-gradient(to_right,#ff0000_0%,#ff0000_35%,#680000_70%,#990000_100%)]
        active:bg-[linear-gradient(to_right,#990000_0%,#990000_35%,#400000_70%,#600000_100%)]

        ${className}
      `}
    >
      {children}
    </div>
  );
};

DropList.Separator = () => {
  return (
    <div
      className="w-full h-[2px]"
      style={{
        borderTop: "1px solid #383838",
        borderBottom: "1px solid #383838",
      }}
    />
  );
};

export default DropList;