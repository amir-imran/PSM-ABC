import Link from "next/link"
import { useRouter } from "next/router"
import Icon from "../components/Icon"

export default function SidebarAdmin({ style, setShowModules, showModules }) {
  const router = useRouter()
  return (
    <ul className="space-y-2">
      <li className={`${router.pathname == "/" ? style : ""}`}>
        <Link href="/">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Dashboard</span>
            <Icon name="fa-chart-line" />
          </a>
        </Link>
      </li>
      <li>
        <button
          type="button"
          className="flex items-center px-1 py-2 w-full text-base font-normal  rounded-lg transition duration-75 group hover:bg-gray-700 "
          aria-controls=""
          data-collapse-toggle=""
        >
          <span
            className="flex-1  text-left whitespace-nowrap"
            sidebar-toggle-item=""
          >
            Modules
          </span>
          <button
            onClick={() => {
              setShowModules(!showModules)
            }}
          >
            {showModules ? (
              <Icon name="fa-chevron-up" />
            ) : (
              <Icon name="fa-chevron-down" />
            )}
          </button>
        </button>
        {showModules && (
          <ul className=" py-2 space-y-2">
            <li
              className={`${
                router.pathname == "/modules/students" ? style : ""
              }`}
            >
              <Link href="/modules/students">
                <a className="flex justify-between items-center px-1 py-2 pl-5 w-full text-sm font-normal  rounded-lg transition duration-75 group hover:bg-gray-700 ">
                  <span> Students</span>
                  <Icon size="sm" name="fa-users" />
                </a>
              </Link>
            </li>
            <li
              className={`${
                router.pathname == "/modules/classes" ? style : ""
              }`}
            >
              <Link href="/modules/classes">
                <a className="flex justify-between items-center px-1 py-2 pl-5 w-full text-sm font-normal  rounded-lg transition duration-75 group hover:bg-gray-700 ">
                  <span> Class</span>
                  <Icon size="sm" name="fa-book" />
                </a>
              </Link>
            </li>
            <li
              className={`${router.pathname == "/modules/tutors" ? style : ""}`}
            >
              <Link href="/modules/tutors">
                <a className="flex justify-between items-center px-1 py-2 pl-5 w-full text-sm font-normal  rounded-lg transition duration-75 group hover:bg-gray-700 ">
                  <span>Tutors </span>
                  <Icon size="sm" name="fa-person-chalkboard" />
                </a>
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li className={`${router.pathname == "/schedule" ? style : ""}`}>
        <Link href="/schedule">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Schedule</span>

            <Icon name="fa-calendar-days" />
          </a>
        </Link>
      </li>

      <li className={`${router.pathname == "/finances" ? style : ""}`}>
        <Link href="/finances">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Finances</span>
            <Icon name="fa-sack-dollar" />
          </a>
        </Link>
      </li>
      {/* <li className={`${router.pathname == "/performance" ? style : ""}`}>
        <Link href="/performance">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">
              Students Performance
            </span>
            <Icon name="fa-rocket" />
          </a>
        </Link>
      </li> */}
      <li className={`${router.pathname == "/feedback" ? style : ""}`}>
        <Link href="/feedback">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Feedback</span>
            <Icon name="fa-comment-medical" />
          </a>
        </Link>
      </li>
    </ul>
  )
}
