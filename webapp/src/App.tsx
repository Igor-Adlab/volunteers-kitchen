import { ReactElement, useState } from "react";

import { router } from "./router";
import { RouterProvider } from "react-router-dom";

export enum ViewMode {
  Search,
  CreateVisitor
}

function App() {
  return <RouterProvider router={router} />
}

export default App;
