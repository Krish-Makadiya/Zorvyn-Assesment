# 💎 FinVision | Premium Personal Finance Dashboard

FinVision is a state-of-the-art, high-fidelity personal financial dashboard built with **React**, **Zustand**, **GSAP**, and **Tailwind CSS**. It provides a professional-grade interface for tracking investments, monitoring cash flow, and managing transactional data with a focus on premium aesthetics and buttery-smooth interactions.

---

## 🚀 Key Features

### 1. **Intuitive Dashboard Hub**
*   **Time-Aware Greetings**: Personalized greetings (Good Morning/Afternoon/Evening) based on the user's local system time.
*   **Adaptive Theme Engine**: Seamless switching between a sophisticated Deep Dark mode and a clean, high-contrast Light mode.
*   **Role-Based Access Control**: Instant toggle between **Admin** and **Viewer** roles to simulate permission-based UI behavior (e.g., hiding delete buttons or transaction modals for viewers).
*   **Bento Grid Architecture**: A responsive 5x5 grid layout that reorganizes itself fluidly for Desktop, Tablet, and Mobile views.

### 2. **Interactive Financial Visualizations**
#### 📈 **Cash Flow Perspective (Line Chart)**
*   **Multi-Period Analysis**: Toggle between **Monthly** and **Yearly** views to track long-term trends versus immediate cash flow.
*   **Segmented Tracking**: Filter data paths for **Income**, **Expenses**, or **Savings** with a single click.
*   **Micro-Interactions**: Hover over data points to reveal precise financial tooltips with dynamic scaling.
*   **SVG Precision**: Custom-built SVG paths with area-shading for a truly professional analytical feel.

#### 🥧 **Expense Breakdown (Donut Chart)**
*   **Category Logic**: Automatically aggregates expenses into core buckets: Housing, Food, Transport, Entertainment, and Utilities.
*   **Interactive Slices**: Hovering over slices dynamically calculates and displays the specific percentage contribution to the total periodic expense.
*   **Live Legend**: Color-coded legend system for instant visual parsing.

#### 💳 **3D Credit Card & AI Insights**
*   **Interactive 3D Hover**: A realistic VISA card visual that responds to mouse movement with tilt and depth effects.
*   **Shadow Analytics**: Floating AI-driven panels that provide high-value metrics like "Card Spending Velocity" and "Credit Limit Utilization".

### 3. **Advanced Transaction Management**
*   **Smart Filtering**: Real-time search by Transaction ID, Recipient Name, or Payment Method.
*   **Status Toggles**: Instantly isolate transactions by status (Completed, Pending, or Failed).
*   **Column Sorting**: Click any table header (Amount, Recipient, Date) to sort data instantly with persistent arrow indicators.
*   **Admin Tools**:
    *   **Add Transaction Modal**: A glassmorphic form for injecting new data points.
    *   **Mass Selection & Delete**: Check multiple items to perform batch administrative actions.

---

## 📤 Sharing & Data Export

### **Exporting Reports**
*   **CSV Extraction**: Download your entire filtered transaction history into a standard `.csv` format compatible with Excel and Google Sheets.
*   **PDF Generation**: Use the global export hub to generate a formatted PDF of the dashboard view for offline records.

### **Online Dashboard Sharing**
*   Click the **Share Dashboard** button in the header to open the Social Connect Hub.
*   **Direct Link**: One-click copying of your current dashboard URL to your clipboard.
*   **Social Integration**: Preset sharing logic for **WhatsApp**, **X (Twitter)**, and **LinkedIn** for instant report sharing with colleagues or financial advisors.

---

## 🛠️ Technology Stack

*   **Framework**: [React](https://react.dev/) (Functional Components + Hooks)
*   **State Management**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) + Persistence Middleware
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom UI Tokens)
*   **Animations**: [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)
*   **Iconography**: [Lucide React](https://lucide.dev/)
*   **Storage**: Browser LocalStorage for persistent user sessions.

---

## 📱 Mobile Experience

FinVision is built with a **Mobile-First** mindset. The massive desktop bento grid automatically transitions into a vertical stream of high-impact cards. The Transaction Table intelligently transforms into a list of mobile-optimized payment cards, ensuring that complex financial data is readable on even the smallest screens without sacrificing the premium aesthetic.

---

## 🛠️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [your-repo-link]
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Launch Dev Server**:
    ```bash
    npm run dev
    ```

---

## 🌐 Dynamic Dashboard Capabilities
While this project focuses on a high-speed, persistent static dataset to demonstrate UI/UX excellence, I have extensive experience building **fully dynamic, data-driven dashboards** across various industries (Real Estate, Healthcare, E-commerce).

### **Key Dynamic Integrations I've Implemented:**
*   **Real-time Data Fetching**: Seamless integration with RESTful and GraphQL APIs for live financial updates.
*   **Server-Side State**: Synchronized backends with high-performance databases (PostgreSQL, MongoDB) using Node.js/Express.
*   **Authentication & Security**: JWT-based auth systems to protect sensitive financial data.

### **Portfolio Showcase (Other Domains):**
| **Project** | **Domain** | **Visual Preview** | **Live Link** |
| :--- | :--- | :--- | :--- |
| **Arogya** | Healthcare (Live Patient Stats) | ![Arogya Healthcare](https://res.cloudinary.com/dcwoprlbv/image/upload/q_auto/f_auto/v1775207872/arogya-bay-six.vercel.app_patient_dashboard_drpyxu.png) | [🔗 View Live Project]([https://arogya-healthcare.link/](https://arogya-bay-six.vercel.app/)) |
| **Mockraft** | EdTech (Student Performance) | ![Mockraft EdTech](https://res.cloudinary.com/dcwoprlbv/image/upload/q_auto/f_auto/v1775207872/dashboard_3_ja9ecd.png) | [🔗 View Live Project]([https://mockraft-edtech.link/](https://mockraft.vercel.app/)) |

---

*Designed and Developed for high-performance financial management.* 📈🚀
