import { NextFunction, Request, Response } from "express";

export const permissionAccess = (requiredRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoleId = (req as any).user?.role_id as string | undefined;

      if (!userRoleId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!requiredRole.includes(userRoleId)) {
        return res.status(403).json({ message: "you are not allowed" });
      }

      next();
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
