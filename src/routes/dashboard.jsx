// @material-ui/icons
import {DashboardRounded, RestoreRounded, FileCopyRounded,SupervisedUserCircle} from "@material-ui/icons";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Reportes from "views/Reportes/Reportes.jsx";
import Admin from "views/Admin/Admin.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Ventas",
    navbarName: "Ventas",
    icon: DashboardRounded,
    component: DashboardPage
  },
  {
    path: "/devoluciones",
    sidebarName: "Devoluciones",
    navbarName: "Devoluciones",
    icon: RestoreRounded,
    component: UserProfile
  },
  {
    path: "/reportes",
    sidebarName: "Reportes",
    navbarName: "Reportes",
    icon: FileCopyRounded,
    component: Reportes
  },
  {
    path: "/admin",
    sidebarName: "Admin",
    navbarName: "Admin",
    icon: SupervisedUserCircle,
    component: Admin
  },
  /* {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
 */
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
