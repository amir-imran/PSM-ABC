import { Menu, Transition } from "@headlessui/react"
import { useRouter } from "next/router"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { Fragment } from "react"
import { useAuth } from "../context/AuthContext"
import Icon from "./Icon"

export default function Dropdown() {
  const { enqueueSnackbar } = useSnackbar()

  const router = useRouter()
  const { user, logout } = useAuth()
  console.log(user)
  const [hoverColor, setHoverColor] = useState(false)
  const [hoverElement, setHoverElement] = useState("")
  const displayed = user?.email.slice(0, user.email.indexOf("@"))
  return (
    <div className="relative z-10 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-primary  px-4 py-2 text-sm font-medium text-black hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {displayed}
            <Icon
              name="fa-user"
              size="xs"
              className="ml-2 -mr-1 h-5 w-5 text-black"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {!user?.admin && (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        router.push("/profile")
                      }}
                      onMouseEnter={() => {
                        setHoverColor(true)
                        setHoverElement("profile")
                      }}
                      onMouseLeave={() => {
                        setHoverColor(false)
                        setHoverElement("")
                      }}
                      className={`${
                        active ? "bg-black text-white" : "text-black"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-black  hover:text-white`}
                    >
                      <Icon
                        name="fa-user"
                        size="1x"
                        className={`mr-2 block ${
                          hoverColor && hoverElement === "profile"
                            ? "text-white"
                            : "text-black"
                        }`}
                      />
                      Profile
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onMouseEnter={() => {
                      setHoverColor(true)
                      setHoverElement("signout")
                    }}
                    onMouseLeave={() => {
                      setHoverColor(false)
                      setHoverElement("")
                    }}
                    onClick={() => {
                      logout()
                      enqueueSnackbar("Logged out successfully", {
                        variant: "success",
                        autoHideDuration: 3000,
                      })

                      router.push("/account/login")
                    }}
                    className={`${
                      active ? "bg-black text-white" : "text-black"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Icon
                      name="fa-arrow-right-to-bracket"
                      size="1x"
                      className={`mr-2 block ${
                        hoverColor && hoverElement === "signout"
                          ? "text-white"
                          : "text-black"
                      }`}
                    />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
