import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex">
      <div className="w-[15vw] h-screen bg-neutral-700 text-white p-1 border-r border-neutral-600">
        Left Pane
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
