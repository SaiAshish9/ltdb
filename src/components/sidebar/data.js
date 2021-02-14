import React from "react";
import CategoryIcon from "@material-ui/icons/Category";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import StorageIcon from "@material-ui/icons/Storage";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import LabelIcon from "@material-ui/icons/Label";
import ReceiptIcon from "@material-ui/icons/Receipt";
import HomeIcon from "@material-ui/icons/Home";
import BuildCircleIcon from "@material-ui/icons/BuildRounded"

export const options = [
  // {
  //   id: "Label",
  //   // id: "Products",
  //   icon: <LabelIcon />,
  //   // icon: <ShoppingBasketOutlinedIcon />,
  //   path: "/labels",
  //   paths: [
  //     "/labels",
  //     // "/products/detail", "/products/new"
  //   ],
  //   options: [
  //     // { name: "Product Detail", path: "/products/detail" },
  //     // { name: "New Product", path: "/products/new" },
  //   ],
  // },
  {
    id: "Dashboard",
    path: "/",
    paths: ["/"],
    icon: <HomeIcon />,
    options: [],
  },
  {
    id: "Users",
    icon: <PeopleIcon />,
    path: "/users",
    paths: ["/users"],
    options: [
      {
        name: "All users",
        path: "/users",
      },
    ],
  },
  {
    id: "Categories",
    icon: <CategoryIcon />,
    path: "/categories",
    paths: ["/categories", "/categories/add/subcategory"],
    options: [],
  },
  {
    id: "Advanced Builder",
    icon: <BuildCircleIcon />,
    path: "/advanced-builder",
    paths: ["/advanced-builder"],
    options: [],
  },
  {
    id: "Items",
    icon: <StorageIcon />,
    path: "/items",
    paths: ["/items"],
    options: [],
  },
  {
    id: "Games",
    icon: <SportsEsportsIcon />,
    path: "/games",
    paths: ["/games"],
    options: [],
  },
  {
    id: "Orders",
    path: "/orders",
    paths: ["/orders", "/orders/details"],
    icon: <AddShoppingCartIcon />,
    options: [{ name: "Orders Detail", path: "/orders/details" }],
  },
  {
    id: "Notifications",
    icon: <NotificationsNoneIcon />,
    path: "/notifications",
    paths: ["/notifications", "/notifications/new"],
    options: [
      {
        name: "All notifications",
        path: "/notifications",
      },
      {
        name: "Add New Notification",
        path: "/notifications/new",
      },
    ],
  },
  {
    id: "Banners",
    icon: <ViewCarouselIcon />,
    path: "/banner",
    paths: ["/banner"],
    options: [],
  },
  {
    id: "Settings",
    icon: <SettingsIcon />,
    path: "",
    paths: ["/settings", "/labels","/delivery-fees"],
    options: [
      {
        name: "Labels",
        labelIcon: <LabelIcon />,
        path: "/labels",
      },
      {
        name: "Delivery Fees",
        labelIcon: <ReceiptIcon />,
        path: "/delivery-fees",
      },
    ],
  },
];
