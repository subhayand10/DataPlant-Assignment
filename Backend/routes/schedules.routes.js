const router = require("express").Router();
const {
  getSchedules,
  getSchedule,
  updateSchedule,
  deleteSchedule,
  createSchedule,
} = require("../controllers/schedules.controllers");

router.get("/", getSchedules);
router.get("/:id", getSchedule); 
router.patch("/:id", updateSchedule); 
router.delete("/:id", deleteSchedule); 
router.post("/", createSchedule); 


module.exports = router;
