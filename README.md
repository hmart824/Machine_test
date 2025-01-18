### 1. Running the Client 🖥️

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install --force
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the application:
   ```bash
   npm run start
   ```

5. Create a `.env` file in the `client` directory with the following content:
   ```env
   NEXT_PUBLIC_API=http://localhost:4444/api
   ```

---
---

### 2. Running the Server ⚙️

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *(If you encounter issues, use the `--force` flag: `npm install --force`)*

3. Start the server in development mode:
   ```bash
   npm run dev
   ```

4. Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=4444
   MONGO_URL="your db url"
   JWT_SECRET_KEY="oops something went wrong"
   ```

---

## 🌟 Features

- **Client**: Built with Next.js for fast, server-side rendering and dynamic routing.
- **Server**: Includes an Express API with MongoDB as the database.
- Environment variables for flexible configuration.

---

## 📂 Directory Structure

```
root
├── client/    # Frontend application
└── server/    # Backend application
```

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome! 😊

---


Happy Coding! 💻✨
```
