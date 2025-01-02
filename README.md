# Project Setup Guide

## 📥 **Clone the Repository**

Start by cloning the repository from GitHub:

```bash
git clone https://github.com/armangral/pumppumpkin-frontend.git
```

Navigate into the project directory:

```bash
cd pumppumpkin-frontend
```

---

## 📦 **Install Dependencies**

Install all required packages using npm:

```bash
npm install
```

---

## 🚀 **Start the Development Server**

### Local Development:

To start the development server locally:

```bash
npm run dev
```

### Host on Local Network:

To make the app accessible on your local network:

```bash
npm run host
```

You can now access the app via:

```
http://<your-local-ip>:<port>
```

---

## 🛠️ **Build for Production**

When you're ready to deploy your application, run:

```bash
npm run build
```

The optimized build files will be generated in the `dist/` folder.

---

## 📚 **Available Scripts**

- `npm run dev`: Starts the Vite development server.
- `npm run host`: Starts the development server and makes it accessible on your local network.
- `npm run build`: Builds the project for production.

---

## 📑 **Additional Notes**

- Use `.env` for environment-specific configurations.
