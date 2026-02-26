import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock Database
const USERS = [
  { id: '1', email: 'system@alumnione.com', password: 'password123', role: 'SYSTEM_ADMIN', name: 'System Master' },
  { id: '2', email: 'uni@bracu.ac.bd', password: 'password123', role: 'UNIVERSITY_ADMIN', name: 'University Admin', universityId: 'bracu' },
  { id: '3', email: 'cse-admin@bracu.ac.bd', password: 'password123', role: 'SPACE_ADMIN', name: 'CSE Admin', universityId: 'bracu', spaceId: 'cse' },
  { id: '4', email: 'alumni@example.com', password: 'password123', role: 'ALUMNI', name: 'John Doe', universityId: 'bracu' },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/auth/login", (req, res) => {
    const { email, password, selectedRole } = req.body;

    const user = USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (user.role !== selectedRole) {
      return res.status(403).json({ message: "You do not have access to this panel." });
    }

    // In a real app, we would generate a JWT here
    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        universityId: user.universityId,
        spaceId: user.spaceId
      },
      token: "mock-jwt-token"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
