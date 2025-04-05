---

```markdown
# 📈 Stock Viewer

A responsive web application for visualizing live and historical stock prices from major global companies like Apple, Microsoft, Tesla, and more.

---

## 🌐 Live Demo

▶️ [Visit Live App](https://stock-view-api.vercel.app)

---

## 🛠️ Tech Stack

**Frontend**
- React
- Tailwind CSS
- Recharts (for interactive charts)
- Vercel (hosting)

**Backend**
- Django + Django REST Framework
- yFinance (for real-time stock data)
- Render (hosting)

---

## ✨ Features

- 📊 Interactive line charts per stock
- 📈 Real-time price updates via REST API
- 🖥️ Clean, mobile-responsive interface
- 🔍 View latest prices in a summary table
- 🔄 Automatically updates without reload

---

## 🚀 Getting Started

### 🧩 Prerequisites

- Python 3.8+
- Node.js + npm
- Git

---

### 📦 Clone the Repository

```bash
git clone https://github.com/istimons/stock-viewer.git
cd stock-viewer
```

---

### ⚙️ Backend Setup (Django)

1. Create and activate a virtual environment:

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the server:

   ```bash
   python manage.py runserver
   ```

> API endpoint will be available at `http://127.0.0.1:8000/api/price?symbol=AAPL`

---

### 💻 Frontend Setup (React)

1. Navigate to the frontend directory (if applicable):

   ```bash
   cd stock-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

> App will be served at `http://localhost:3000`

---

## 🌍 Deployment

- **Backend**: [Render](https://render.com)
- **Frontend**: [Vercel](https://vercel.com)


## 🙋‍♂️ Author

**Timon Njuhigu**  
🔗 [GitHub - istimons](https://github.com/istimons)


