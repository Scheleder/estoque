require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getInfo = async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const { prompt } = req.body;
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return res.status(200).json({ answer: text})
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ msg: "Erro ao consultar a API do Gemini: " + error.message });
    }
}
