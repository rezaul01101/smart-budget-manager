import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  // {
  //   path: "/user",
  //   route: UserRoutes,
  // },
  // {
  //   path: "/category",
  //   route: CategoryRoutes,
  // },
  // {
  //   path: "/brand",
  //   route: BrandRoutes,
  // },
  // {
  //   path: "/product",
  //   route: ProductRoutes,
  // },
  // {
  //   path: "/slider",
  //   route: SliderRoutes,
  // },
  // {
  //   path: "/order",
  //   route: OrderRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
