# AsyncHandler

A **production-grade async error handler** for Express.js, built with:

- 🔁 Automatic async error catching (`asyncHandler`)
- 📦 Consistent API error & success responses (`ApiError`, `ApiResponse`)
- 🛡️ Centralized logging using **Winston logger**
- ✅ JSON-only output — built for modern APIs

---

## 📦 Installation

```bash
npm install asynchandler
```

## 🚀 Features

- ✅ `asyncHandler()` wrapper for all async routes & middlewares
- 📡 `ApiResponse` — consistent JSON structure for success
- ❌ `ApiError` — customizable error class with optional metadata
- 📋 Built-in Winston logger (logs to console and `logs/*.log` files)
- 🧼 Minimal configuration required
- 🛠️ Built-in `NODE_ENV` support

---

## 📁 Project Structure (inside package)

```bash
node_modules/asynchandler/
├── src/
│   ├── index.js         # asyncHandler()
│   ├── logger.js        # Winston logger setup
│   ├── ApiError.js      # Custom Error class
│   ├── ApiResponse.js   # Standard Response class
```

---

## 🧠 When to Use

Without `asynchandler`:

```js
app.get("/user", async (req, res) => {
  const user = await User.findById(req.params.id); // crash on error
  res.json(user);
});
```

With `asynchandler`:

```js
import { asyncHandler } from "asynchandler";

app.get(
  "/user",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json(new ApiResponse(200, "User found", user));
  })
);
```

---

## 🔧 Usage Example

```js
import express from "express";
import { asyncHandler, ApiError, ApiResponse } from "asynchandler";

const app = express();

// ✅ Success example
app.get(
  "/hello",
  asyncHandler(async (req, res) => {
    res
      .status(200)
      .json(new ApiResponse(200, "Hello World", { name: "Jaydip" }));
  })
);

// ❌ Error example
app.get(
  "/error",
  asyncHandler(async (req, res) => {
    throw new ApiError(400, "Something went wrong");
  })
);

// ✅ Express default error handler fallback (optional)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Unexpected error" });
});

app.listen(3000, () => console.log("Server started on port 3000"));
```

---

## ✨ Response Format

### ✅ Success Response (`ApiResponse`)

```json
{
  "statusCode": 200,
  "message": "Data fetched successfully",
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Jaydip"
    }
  }
}
```

### ❌ Error Response (`ApiError`)

```json
{
  "statusCode": 404,
  "message": "User not found",
  "errors": [],
  "success": false
}
```

---

## 🔥 Logger Output

- In **development**: logs to console with colors
- In **production**: logs to files in `logs/` folder

  - `logs/error.log` → Errors
  - `logs/combined.log` → All logs

### Example Winston Log (file):

```
[2025-08-07 14:12:32] error: [GET] /fail - Something went wrong
```

---

## 📖 API Reference

### `asyncHandler(fn, options?)`

Wrap any async Express route or middleware.

| Option        | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| `logger`      | function | Optional custom logger (`.error()`) |
| `formatError` | function | Custom error formatter              |

---

### `new ApiError(statusCode, message?, errors?, stack?)`

| Param      | Type   | Description                         |
| ---------- | ------ | ----------------------------------- |
| statusCode | number | HTTP status code                    |
| message    | string | Human-readable error message        |
| errors     | array  | Optional array of validation issues |
| stack      | string | Optional stack override             |

---

### `new ApiResponse(statusCode, message, data?)`

| Param      | Type   | Description      |
| ---------- | ------ | ---------------- |
| statusCode | number | HTTP status code |
| message    | string | Message string   |
| data       | any    | Optional payload |

---

## 🧪 Sample Curl Test

```bash
curl http://localhost:3000/hello
curl http://localhost:3000/error
```

---

## 📦 Logging Output Preview

```bash
# Console output (if NODE_ENV !== production)
[2025-08-07 14:12:32] error: [GET] /fail - Something went wrong

# logs/error.log
[2025-08-07 14:12:32] error: [GET] /fail - Something went wrong

# logs/combined.log
[2025-08-07 14:12:32] error: [GET] /fail - Something went wrong
```

---

## 🙌 Contributing

PRs are welcome! Please fork the repo and submit a pull request with clear description.

---

## 📄 License

[MIT](./LICENSE)

---

## 🌐 Connect

Made with ❤️ by [Jaydip Satani](https://github.com/jaydip-satani)
