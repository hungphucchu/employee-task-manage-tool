import { Router } from "express";
import { userController } from "../controller/userController";
import { authenticateMiddleware } from "../middleware/authentication";

const router = Router();

router.post("/", userController.createNewUserAccount);
router.post("/accessCode", userController.createNewAccessCode);
router.post("/validate/accessCode", userController.validateAccessCode);
router.post("/validate/username", userController.validateUsernameAndPassword);
router.get(
  "/validate/token",
  authenticateMiddleware.authenticateToken,
  userController.validateToken,
);
router.put(
  "/",
  authenticateMiddleware.authenticateToken,
  userController.editUser,
);
router.put("/criteria", userController.editUserWithCriteria);
router.post("/id", userController.getUserById);

export default router;
