import useAuthStore from "@/store/auth";
import {
  Home,
  School,
  SectionIcon,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function SideBar() {
  const pathname = usePathname();
  const user = useAuthStore();
  const { t } = useTranslation();

  const sideItems = [
    { label: t("admin.dashboard"), icon: <Home />, path: "/admin/dashboard/" },
    {
      label: t("admin.users"),
      icon: <Users />,
      path: "/admin/dashboard/users",
    },
    {
      label: t("admin.sectors"),
      icon: <SectionIcon />,
      path: "/admin/dashboard/sectors",
    },
    {
      label: t("admin.companies"),
      icon: <School />,
      path: "/admin/dashboard/companies",
    },
    {
      label: t("admin.products"),
      icon: <ShoppingCart />,
      path: "/admin/dashboard/products",
    },
  ];
  const sideItems1 = [
    {
      label: t("admin.settings"),
      icon: <Settings />,
      path: "/admin/dashboard/settings",
    },
  ];
  return (
    <aside className="flex flex-col w-64 px-4 py-8 overflow-y-auto border-gray-100 border-r rtl:border-r-0 rtl:border-l ">
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {sideItems.map((item, index) => (
            <Link
              className={`flex items-center mt-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-red-700 hover:text-white  rounded-md  ${
                item.path === pathname ? "bg-red-700  text-white" : ""
              }`}
              href={item.path}
              key={index}
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.label}</span>
            </Link>
          ))}
          <hr className="my-6 border-gray-200 " />
          {sideItems1.map((item, index) => (
            <Link
              className={`flex items-center mt-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-red-700 hover:text-white rounded-md  ${
                item.path === pathname ? "bg-red-700 text-white" : ""
              }`}
              href={item.path}
              key={index}
            >
              {item.icon}
              <span className="mx-4 font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <a href="#" className="flex items-center px-4 -mx-2">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-800 ">
            {user.user?.name}
          </span>
        </a>
      </div>
    </aside>
  );
}
