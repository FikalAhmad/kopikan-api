import { Prisma } from "@prisma/client";
import { ApplySortParams, QuerySorts } from "./types";

/**
 * Generate Prisma orderBy object
 */
export function applySort({ sorts, orderKey }: ApplySortParams) {
  let sorted: QuerySorts[] = [];

  // parsing sorts
  if (Array.isArray(sorts)) {
    sorted = sorts;
  } else if (typeof sorts === "string") {
    sorted = JSON.parse(sorts) as QuerySorts[];
  }

  let orderBy: Prisma.Enumerable<Prisma.SortOrder> | any = [];

  if (sorted.length > 0) {
    orderBy = sorted.map((item) => ({
      [item.sort]: item.order.toLowerCase() === "desc" ? "desc" : "asc",
    }));
  } else {
    orderBy = [{ [orderKey || "created_at"]: "desc" }];
  }

  return orderBy;
}

// async function getUsers(req, res) {
//   const { sorts } = req.query; // misal sorts = '[{"sort":"name","order":"asc"}]'

//   const orderBy = applySort({ sorts, orderKey: "created_at" });

//   const users = await prisma.user.findMany({
//     orderBy, // hasil dari applySort
//   });

//   res.json(users);
// }
