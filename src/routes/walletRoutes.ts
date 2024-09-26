import { Router } from "express";

import { sendMoney, viewTransactionHistory } from "../controllers";

const router = Router();

router.put("/api/send", sendMoney);
router.get("/api/history/:accountId", viewTransactionHistory);

export default router;
