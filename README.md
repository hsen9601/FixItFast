# 🛠️ FixItFast

**FixItFast** is a **full-stack service management platform** where customers can submit service requests and local craftsmen can accept or decline them. Admin users have full system control including moderation and account management. The project showcases essential concepts like **authentication**, **authorization**, **CRUD logic** and **API design**

---

## ✨ Features

* 🔐 **Role-based system** (Customer, Craftsman, Admin)
* 🧾 **CRUD operations** for users and service requests
* 🔗 **RESTful .NET API** connected to a **SQL database**
* 🖥️ **React frontend** consuming the backend API
* 🏗️ **Entity Framework Core** with migrations and repository logic

---

## 💻 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | **ASP.NET Core Web API** (.NET 7), **Entity Framework Core** |
| **Frontend** | **React**, Axios, Vite |
| **Database** | **SQL Server** (local) |
| **Version Control** | **Git** & **GitHub** |

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/yourusername/fixitfast.git](https://github.com/yourusername/fixitfast.git)
```
```bash
cd fixitfast
```
# ⚙️ Backend Setup
## 2️⃣ Configure DatabaseEdit appsettings.json:
```bash
JSON{
  "ConnectionStrings": {
    "DevConnection": "Server=(localdb)\\MSSQLLocalDB;Database=FixItFastDb;Trusted_Connection=True;"
  }
}
```
## 3️⃣ Apply EF MigrationsBashcd WebApi
```bash
dotnet ef database update
```
## 4️⃣ Run the BackendBash:
```bash
dotnet run
```
### API will run at: http://localhost:"YOURPORT"/api //typically 5223
--- 
# 🎨 Frontend Setup
```bash
cd frontend
```
 ```bash
npm install
```
```bash
npm run dev
```
### Frontend will run at: http://localhost:"YOURPORT" //typically 5713
--- 
# 📂 Project Folder Structure:
###  FixItFast
 ### ├── WebApi (Contains the .NET Core backend)
 ### ├── frontend (Contains the React application)
 ### └── README.md (This file)
--- 
# License
### MIT- free to use and modify
