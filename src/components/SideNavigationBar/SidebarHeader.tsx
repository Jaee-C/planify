import React from "react";

export default function SidebarHeader(
  props: React.PropsWithChildren
): JSX.Element {
  return (
    <div className="flex px-5 py-2 box-border w-full appearance-none min-h-[40px] justify-between gap-2.5">
      <h2 className="flex-grow text-left font-medium">{props.children}</h2>
    </div>
  );
}
