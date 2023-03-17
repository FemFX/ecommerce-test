import { FC, ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export interface ILayoutProps {
  children: ReactNode;
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 4fr",
        }}
      >
        <Sidebar />
        <main className="p-12">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
