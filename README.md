Here is a complete **README.md** you can use for your npm package `jwt-express-guard`.

---

````markdown
# 🔐 jwt-express-guard

A plug-and-play **JWT authentication + role-based access control + rate limiting** middleware for Express apps.

✅ Zero configuration  
✅ Friendly error responses  
✅ Supports Bearer token  
✅ Easy role protection  
✅ Optional rate limiter

Perfect for projects using **Node.js + Express + JWT**.

---

## 📦 Installation

```sh
npm install jwt-express-guard
```
````

or

```sh
yarn add jwt-express-guard
```

---

## 🚀 Quick Start

```js
const express = require("express");
const { jwtGuard, roleGuard, rateLimiter } = require("jwt-express-guard");

const app = express();

app.get(
  "/admin",
  jwtGuard({ secret: process.env.JWT_SECRET }),
  roleGuard(["admin"]),
  rateLimiter(5, 60000), // 5 requests per minute
  (req, res) => {
    res.json({ message: `Welcome admin, ${req.user.name} 🚀` });
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🧩 API Usage

### `jwtGuard({ secret })`

Authenticates the request using a **JWT Bearer token**.

| Parameter | Required | Type     | Description                     |
| --------- | -------- | -------- | ------------------------------- |
| `secret`  | ✅       | `string` | JWT secret used to verify token |

Attaches the decoded user to `req.user`.

---

### `roleGuard(["role1", "role2"])`

Restricts access based on user roles.

| Parameter      | Required | Type       | Example                |
| -------------- | -------- | ---------- | ---------------------- |
| `allowedRoles` | ✅       | `string[]` | `["admin", "manager"]` |

---

### `rateLimiter(limit?, timeWindow?)`

Limits requests per IP.

| Parameter    | Required | Type     | Default    |
| ------------ | -------- | -------- | ---------- |
| `limit`      | ❌       | `number` | `10`       |
| `timeWindow` | ❌       | `number` | `60000 ms` |

---

## 🛠 How To Send Token

Send the token in `Authorization` header:

```
Authorization: Bearer <your-token>
```

---

## ✅ Example Controller Output

```json
{
  "success": false,
  "message": "Token missing"
}
```

---

## ❓ Error Responses

| Error Code | Message                       |
| ---------- | ----------------------------- |
| `401`      | Token missing / invalid token |
| `403`      | Forbidden (role not allowed)  |
| `429`      | Too many requests             |

---

## 📁 Folder Structure (for contributors)

```
src/
├── index.js       # main export file
├── token.js       # JWT verification logic
├── guards.js      # role + rate limiter middlewares
```

---

## 🌟 Why this package?

Instead of writing auth middleware again and again:

```js
jwtGuard({ secret: "my-secret" });
roleGuard(["admin"]);
rateLimiter(5, 60000);
```

**Done.**

---

## 🧪 Test Token Generation (Optional)

```js
const jwt = require("jsonwebtoken");

const token = jwt.sign(
  { id: 1, name: "Naveed", role: "admin" },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);

console.log(token);
```

---

## 📜 License

MIT — Feel free to use in personal and commercial projects.

---

## ❤️ Contribute

Pull Requests are welcome!

If you like it, give it a ⭐ on GitHub & npm:

```
npmjs.com/package/jwt-express-guard
```

---

Made with ❤️ by **Muhammad Naveed**

```

---

If you want, I can also:

- Add badges (downloads, version, license)
- Generate GIF demos for README
- Publish package to npm with you

Just tell me **“add badges to readme”** or **“convert project to TypeScript”** and I’ll do it.
```
