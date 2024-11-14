import { Router } from 'express';
const router = Router();
import {
    createEmployee,
    deleteEmployee,
    getAllEmployee,
    getEmployee,
    updateEmployee,
  } from "../controllers/employeeController";
import { verifyTokenMiddleware } from "../middleware/verifyTokenMiddleware";
import { verifyRoleMiddleware } from "../middleware/verifyRoleMiddleware";

router.get("/getAllEmployee", verifyTokenMiddleware, verifyRoleMiddleware("ADMIN", "SUPER_ADMIN"), getAllEmployee);
router.get("/getOneEmployee/:id", verifyTokenMiddleware, verifyRoleMiddleware("ADMIN", "SUPER_ADMIN"), getEmployee);
router.post("/createEmployee", verifyTokenMiddleware, verifyRoleMiddleware("SUPER_ADMIN"), createEmployee);
router.put("/updateEmployee/:id", verifyTokenMiddleware, verifyRoleMiddleware("SUPER_ADMIN"), updateEmployee);
router.delete("/deleteEmployee/:id", verifyTokenMiddleware, verifyRoleMiddleware("SUPER_ADMIN"), deleteEmployee);

export default router;