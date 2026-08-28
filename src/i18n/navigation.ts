import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

//Exporting unified routing primitives to prevent full browser reloads
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)