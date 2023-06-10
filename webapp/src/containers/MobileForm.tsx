import { ReactElement } from "react";

export function MobileForm({ children }: { children: ReactElement | ReactElement[] }) {
  return (
    <div className="App pt-3" style={{ maxWidth: 500, margin: "0 auto" }}>
      {children}
    </div>
  );
}
