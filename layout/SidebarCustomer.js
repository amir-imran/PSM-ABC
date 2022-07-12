import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../components/Icon";

export default function SidebarCustomer({
  style,
  setShowModules,
  showModules,
}) {
  const router = useRouter();
  return (
    <ul className="space-y-2">
      <li className={`${router.pathname == "/student" ? style : ""}`}>
        <Link href="/student">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Dashboard</span>
            <Icon name="fa-chart-line" />
          </a>
        </Link>
      </li>

      <li className={`${router.pathname == "/student/class" ? style : ""}`}>
        <Link href="/student/class">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Manage Class</span>

            <Icon name="fa-list-check" />
          </a>
        </Link>
      </li>

      <li className={`${router.pathname == "/student/finances" ? style : ""}`}>
        <Link href="/student/finance">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Payment Fee</span>
            <Icon name="fa-sack-dollar" />
          </a>
        </Link>
      </li>
      <li className={`${router.pathname == "/student/schedule" ? style : ""}`}>
        <Link href="/student/schedule">
          <a className="flex items-center px-1 py-2 text-base font-normal  rounded-lg hover:bg-gray-700 ">
            <span className="flex-1  whitespace-nowrap">Schedule</span>
            <Icon name="fa-calendar-days" />
          </a>
        </Link>
      </li>
    </ul>
  );
}
