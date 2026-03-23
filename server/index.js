import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { initSocket } from "./socket.js";
import authMiddleware from "./middleware/auth.js";
import { initDb } from "../database/db.js";
import multer from "multer";
import fs from "fs";
import { i18nMiddleware, injectI18n } from "./middleware/i18n.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // En producción, limita esto al dominio de Kinetora
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(i18nMiddleware); // Detecta lenguaje por dominio

// Protect all /api/portal routes
app.use("/api/portal", authMiddleware);

// File Upload Configuration (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId, taskId } = req.body;
    let uploadPath = "";
    
    if (taskId) {
      uploadPath = path.join(__dirname, "../public/uploads/clientes", userId.toString(), "tasks", taskId.toString());
    } else {
      uploadPath = path.join(__dirname, "../public/uploads/clientes", userId.toString(), "deliverables");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Serve Static Files with Protection (Simulated)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

// Socket.io initialization
initSocket(io);

// API Endpoints
app.post("/api/portal/upload", upload.array("files"), (req, res) => {
  res.json({ message: "Archivos subidos con éxito", files: req.files });
});

app.get("/api/portal/deliverables/:userId", (req, res) => {
    const { userId } = req.params;
    const deliverablesPath = path.join(__dirname, "../public/uploads/clientes", userId, "deliverables");
    
    if (!fs.existsSync(deliverablesPath)) {
        return res.json([]);
    }
    
    const files = fs.readdirSync(deliverablesPath).map(file => ({
        name: file,
        url: `/uploads/clientes/${userId}/deliverables/${file}`,
        type: path.extname(file).toUpperCase().substring(1)
    }));
    
    res.json(files);
});

// Serving the Frontend with i18n Injection (Production Ready)
const DIST_PATH = path.join(__dirname, "../dist");
const INDEX_HTML = path.join(DIST_PATH, "index.html");

app.use(express.static(DIST_PATH, { index: false })); // Serve static assets but not index.html yet

app.get("*", (req, res) => {
  // If index.html doesn't exist (dev mode), just send 404 or a message
  if (!fs.existsSync(INDEX_HTML)) {
    return res.status(404).send("Fronted not built. Run 'npm run build' first.");
  }

  let html = fs.readFileSync(INDEX_HTML, "utf8");
  const currentUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  
  // Dynamic SEO Injection (hreflang + language config)
  html = injectI18n(html, req.lang, currentUrl);
  
  res.send(html);
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, async () => {
  await initDb();
  console.log(`Server running on port ${PORT}`);
});
