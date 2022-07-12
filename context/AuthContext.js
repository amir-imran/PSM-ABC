import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth, db } from "../config/firebase"

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  // const [usersInfo, setUsersInfo] = useState([])

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef)
  //     setUsersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }
  //   getUsers()
  // }, [])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        setUser({ ...user, admin: idTokenResult.claims.admin })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signup = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user

      // user.displayName({ displayName: name })

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user?.displayName,
        authProvider: "local",
        email,
        isAdmin: false,
        // admin: false,
      })
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
  }
  const logout = async () => {
    // setUsersInfo([])
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
