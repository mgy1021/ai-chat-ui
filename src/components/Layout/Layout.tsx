import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className=" flex h-lvh w-1vw">{children}</div>
    </>
  );
}
