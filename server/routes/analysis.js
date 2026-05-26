const express = require("express");
const router = express.Router();
const {
  analyzeImage,
  getHistory,
  deleteAnalysis,
} = require("../controllers/analysisController");

router.post("/", analyzeImage);
router.get("/", getHistory);
router.delete("/:id", deleteAnalysis);

module.exports = router;
