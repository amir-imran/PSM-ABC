import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { user } = useAuth()
  useEffect(() => {
    if (!user) {
      router.push("/account/login")
    }
  }, [router.push, user])

  return <div>{user ? children : null}</div>
}

export default ProtectedRoute
