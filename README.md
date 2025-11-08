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

or

```sh
yarn add jwt-express-guard
```

## Use inside your Express app

```
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

## API Usage

`jwtGuard({ secret })`

Authenticates the request using a JWT Bearer token.

| Parameter | Required | Type   | Description                     |
| --------- | -------- | ------ | ------------------------------- |
| `secret`  | ✅       | string | JWT secret used to verify token |

`roleGuard(["role1", "role2"])`

Restricts access based on user roles.

| Parameter      | Required | Type     | Example                |
| -------------- | -------- | -------- | ---------------------- |
| `allowedRoles` | ✅       | string[] | `["admin", "manager"]` |

`rateLimiter(limit?, timeWindow?)`

Limits requests per IP.
| Parameter | Required | Type | Default |
| ------------ | -------- | ------ | ---------- |
| `limit` | ❌ | number | `10` |
| `timeWindow` | ❌ | number | `60000 ms` |

## 🛠 How To Send Token

Add JWT token in request header:

```
Authorization: Bearer <your-token>
```

## ✅ Example Controller Output

| Error Code | Message                       |
| ---------- | ----------------------------- |
| `401`      | Token missing / invalid token |
| `403`      | Forbidden (role not allowed)  |
| `429`      | Too many requests             |

## 📜 License

MIT Feel free to use in personal and commercial projects.

If you like it, give it a ⭐ on GitHub & npm:

npmjs.com/package/jwt-express-guard
Made with ❤️ by Muhammad Naveed
