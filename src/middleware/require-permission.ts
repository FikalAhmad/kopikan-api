// import { NextFunction, Response } from "express";
// import { UserRequest } from "../types/user-request";
// import { Permission, UserRole } from "@prisma/client";
// import { prismaClient } from "../application/database";

// export const requirePermission = (requiredPermissions: Permission[]) => {
//   return async (req: UserRequest, res: Response, next: NextFunction) => {
//     try {
//       const user = await prismaClient.user.findUnique({
//         where: { email: req.user?.email },
//         select: {
//           role: true,
//           permissions: true,
//           active: true
//         }
//       });

//       if (!user || !user.active) {
//         return res.status(403).json({
//           error: "User not found or inactive"
//         });
//       }

//       // Super Admin memiliki semua permissions
//       if (user.role === UserRole.SUPER_ADMIN) {
//         return next();
//       }

//       // Cek apakah user memiliki semua permission yang diperlukan
//       const hasAllPermissions = requiredPermissions.every(permission =>
//         user.permissions.includes(permission)
//       );

//       if (!hasAllPermissions) {
//         return res.status(403).json({
//           error: "Insufficient permissions"
//         });
//       }

//       next();
//     } catch (error) {
//       return res.status(500).json({
//         error: "Authorization error"
//       });
//     }
//   };
// };
