import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <div className="w-full h-full">
      <Outlet/>
    </div>
  )
}

export default MainLayout
