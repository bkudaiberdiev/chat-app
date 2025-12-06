import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ---------------- LOGIN ----------------
// Авторизация по username (без пароля)
server.post("/login", (req, res) => {
  const { username } = req.body;
  const users = router.db.get("users").value();
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ error: "Пользователь не найден" });
  }

  res.json(user);
});

// ---------------- REGISTER ----------------
// Добавление нового пользователя
server.post("/register", (req, res) => {
  const { username, name, email, avatar } = req.body;
  const users = router.db.get("users").value();

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: "Логин уже занят" });
  }

  const newUser = {
    id: Date.now(),
    name: name || "",
    username,
    email: email || "",
    avatar: avatar || "",
    address: {},
    posts: [],
    accountHistory: []
  };

  router.db.get("users").push(newUser).write();
  res.json(newUser);
});

// ---------------- DEFAULT ROUTES --------------
server.use(router);

server.listen(3001, () => {
  console.log("Custom JSON-server running on port 3001");
});



// ---------------- CREATE CHANNEL ----------------
server.post("/channels", (req, res) => {
  const { name, description } = req.body;

  const newChannel = {
    id: Date.now(),
    name,
    description: description || ""
  };

  router.db.get("channels").push(newChannel).write();
  res.json(newChannel);
});

// ---------------- GET ALL CHANNELS ----------------
server.get("/channels", (req, res) => {
  const channels = router.db.get("channels").value();
  res.json(channels);
});

// ---------------- GET CHANNEL BY ID ----------------
server.get("/channels/:id", (req, res) => {
  const channel = router.db
    .get("channels")
    .find({ id: Number(req.params.id) })
    .value();

  channel ? res.json(channel) : res.status(404).json({ error: "Channel not found" });
});

// ---------------- USER → JOIN CHANNEL ----------------
server.post("/channels/:id/join", (req, res) => {
  const { userId } = req.body;
  const db = router.db;

  const user = db.get("users").find({ id: userId }).value();
  const channelId = Number(req.params.id);

  if (!user) return res.status(400).json({ error: "User not found" });

  if (!user.channels.includes(channelId)) {
    user.channels.push(channelId);
    db.get("users").find({ id: userId }).assign(user).write();
  }

  res.json(user);
});

// ---------------- USER → LEAVE CHANNEL ----------------
server.post("/channels/:id/leave", (req, res) => {
  const { userId } = req.body;
  const db = router.db;

  const user = db.get("users").find({ id: userId }).value();
  const channelId = Number(req.params.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  user.channels = user.channels.filter(id => id !== channelId);

  db.get("users").find({ id: userId }).assign(user).write();

  res.json(user);
});

// ---------------- CHANNEL MEMBERS ----------------
server.get("/channels/:id/users", (req, res) => {
  const channelId = Number(req.params.id);

  const users = router.db
    .get("users")
    .filter(u => u.channels.includes(channelId))
    .value();

  res.json(users);
});