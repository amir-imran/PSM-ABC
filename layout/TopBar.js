import { useRouter } from "next/router"
import React from "react"
import Dropdown from "../components/Dropdown"
import { useAuth } from "../context/AuthContext"
const TopBar = () => {
  const router = useRouter()
  const { pathname } = router

  const title =
    pathname === "/" ? "dashboard" : pathname.split("/").slice(-1).pop()
  return (
    <div className="bg-black text-white pl-16 p-4  uppercase text-xl flex justify-between">
      <p>{title}</p>
      <div>
        {router.pathname !== "/account/login" &&
          router.pathname !== "/account/register" && <Dropdown />}
      </div>
    </div>
  )
}

export default TopBar
