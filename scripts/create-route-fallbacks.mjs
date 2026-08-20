import { copyFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const routes = [
  "about",
  "experience",
  "projects/payment",
  "projects/lifecaregarden",
  "projects/aggregate-payment",
  "projects/home-information-management-system",
  "projects/jpnms",
];

for (const route of routes) {
  const routeDirectory = join("dist", route);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(join("dist", "index.html"), join(routeDirectory, "index.html"));
}
