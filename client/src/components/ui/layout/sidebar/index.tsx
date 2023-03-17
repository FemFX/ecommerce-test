import { FC } from "react";

export interface ISidebarProps {}
const Sidebar: FC<ISidebarProps> = ({}) => {
  return <aside className="h-screen bg-secondary">sidebar</aside>;
};
export default Sidebar;
