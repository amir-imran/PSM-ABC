import "@fullcalendar/common/main.css"
import "@fullcalendar/daygrid/main.css"
import "@fullcalendar/timegrid/main.css"

import Layout from "../layout/Layout"
import "../styles/globals.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { SnackbarProvider } from "notistack"

import {
  faArrowRightToBracket,
  faArrowCircleRight,
  faBars,
  faBook,
  faCalendarDays,
  faChartSimple,
  faCircleDollarToSlot,
  faFolderClosed,
  faChartLine,
  faChevronDown,
  faChevronUp,
  faCommentMedical,
  faInbox,
  faListCheck,
  faMagnifyingGlass,
  faMoneyCheck,
  faPersonChalkboard,
  faRocket,
  faSackDollar,
  faSearch,
  faSpinner,
  faSchool,
  faTrash,
  faTrophy,
  faUser,
  faUsers,
  faXmark,
} from "@fortawesome/free-solid-svg-icons"
import { AuthContextProvider } from "../context/AuthContext"
import ProtectedRoute from "../components/ProtectedRoute"
import { useRouter } from "next/router"
library.add(
  faArrowRightToBracket,
  faArrowCircleRight,
  faBars,
  faBook,
  faCalendarDays,
  faChartSimple,
  faCircleDollarToSlot,
  faFolderClosed,
  faChartLine,
  faChevronDown,
  faChevronUp,
  faCommentMedical,
  faInbox,
  faListCheck,
  faMagnifyingGlass,
  faMoneyCheck,
  faPersonChalkboard,
  faRocket,
  faSackDollar,
  faSearch,
  faSpinner,
  faSchool,
  faTrash,
  faTrophy,
  faUser,
  faUsers,
  faXmark
)
const noAuthRequired = ["/account/login", "/account/register"]

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <AuthContextProvider>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </SnackbarProvider>
    </AuthContextProvider>
  )
}

export default MyApp
