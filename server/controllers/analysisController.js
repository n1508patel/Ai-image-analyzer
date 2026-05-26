require("dotenv").config();

const axios = require("axios");
const Analysis = require("../models/Analysis");

// ===============================
// POST /api/analyze
// Analyze image using Groq Vision
// ===============================
const analyzeImage = async (req, res) => {
  try {

    const {
      imageBase64,
      mediaType,
      imageName,
    } = req.body;

    // Validation
    if (!imageBase64 || !mediaType) {
      return res.status(400).json({
        success: false,
        error: "imageBase64 and mediaType are required",
      });
    }

    // Prompt
    const prompt = `
Analyze this image thoroughly and respond ONLY with valid JSON.

{
  "caption": "A single vivid sentence describing the image",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "mood": "overall mood",
  "objects": ["object1", "object2", "object3"],
  "colors": ["color1", "color2", "color3"],
  "detailedAnalysis": "2-3 sentence detailed analysis"
}
`;

    // Groq API Call
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",

      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",

        messages: [
          {
            role: "user",

            content: [
              {
                type: "text",
                text: prompt,
              },

              {
                type: "image_url",

                image_url: {
                  url: `data:${mediaType};base64,${imageBase64}`,
                },
              },
            ],
          },
        ],

        temperature: 0.3,
      },

      {
        headers: {
          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`,

          "Content-Type": "application/json",
        },
      }
    );

    // Extract text
    console.log("FULL GROQ RESPONSE:");
console.log(JSON.stringify(response.data, null, 2));

const text =
  response.data?.choices?.[0]?.message?.content || "";

console.log("AI TEXT:");
console.log(text);
    // Clean markdown
    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("CLEAN RESPONSE:");
console.log(clean);

let parsed;

try {

  parsed = JSON.parse(clean);

  console.log("PARSED JSON:");
  console.log(parsed);

} catch (parseError) {

  console.log("JSON ERROR:");
  console.log(parseError);

  return res.status(500).json({
    success: false,
    error: "Invalid JSON returned by AI",
    raw: clean,
  });
}
    // Save to MongoDB
    const analysis = await Analysis.create({

  imageUrl:
    `data:${mediaType};base64,${imageBase64.slice(0, 100)}...`,

  imageName: imageName || "Untitled",

  caption: parsed.caption || "",

  tags: Array.isArray(parsed.tags)
    ? parsed.tags
    : [],

  mood: parsed.mood || "",

  objects: Array.isArray(parsed.objects)
    ? parsed.objects
    : [],

  colors: Array.isArray(parsed.colors)
    ? parsed.colors
    : [],

  detailedAnalysis:
    parsed.detailedAnalysis || "",
});

console.log("MONGODB SAVED:");
console.log(analysis);

    // Success response
    res.status(201).json({
      success: true,
      data: analysis,
    });

  } catch (error) {

    console.error(
      "analyzeImage error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error:
        error.response?.data ||
        error.message,
    });
  }
};

// ===============================
// GET /api/analyze
// ===============================
const getHistory = async (req, res) => {
  try {

    const history = await Analysis.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ===============================
// DELETE /api/analyze/:id
// ===============================
const deleteAnalysis = async (req, res) => {
  try {

    await Analysis.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  analyzeImage,
  getHistory,
  deleteAnalysis,
};