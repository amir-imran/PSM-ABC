import { Fragment } from "react"
import SideBar from "./SideBar"
import TopBar from "./TopBar"
const Layout = (props) => {
  return (
    <Fragment>
      <SideBar />
      <TopBar />
      <main className="pl-16 pt-2 pr-4 pb-4">{props.children}</main>
    </Fragment>
  )
}

export default Layout
