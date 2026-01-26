# ONLINE TODO LIST（線上待辦事項）

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)  [![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

這是一個具備「登入 / 註冊」流程的線上待辦事項網站。使用者登入後可新增待辦、刪除待辦、切換完成狀態，並支援 **雙擊編輯待辦內容**（更新後端資料）。同時提供 **初次載入 Loading 狀態**、空列表與分頁（全部 / 待完成 / 已完成）顯示，讓待辦管理更直覺。
![Todo Page](./public/preview-login.png)

---

## 網站連結

https://howardxsheng-beep.github.io/Todo-list/

---

## 使用技術

### 核心框架（Core）
- React 19

### 建構工具（Build Tool）
- Vite 7

### 路由管理（Routing）
- React Router（HashRouter）

### 樣式處理（Styling）
- Tailwind CSS 4

### 資料處理 / API
- Axios（封裝 request、呼叫 todo API）
- js-cookie（儲存 token / nickname / exp）

### 部署（Deployment）
- GitHub Pages
- gh-pages

---

## 功能特色

- ✅ 登入 / 註冊（表單驗證、錯誤訊息提示）
- ✅ Cookie 儲存登入狀態（token / nickname / exp）
- ✅ 待辦列表 CRUD
  - 新增待辦
  - 刪除待辦
  - 切換完成狀態（完成 / 未完成）
- ✅ 雙擊編輯待辦內容（onDoubleClick → input 編輯 → Enter / blur 提交）
- ✅ 分頁篩選（全部 / 待完成 / 已完成）
- ✅ 初次載入 Loading（避免未抓到資料就顯示空狀態）
- ✅ 空狀態畫面（無待辦 / 分頁無資料）

---

## 專案結構說明

todo-list/
│
├─ public/                     # 放網站固定用的靜態檔（favicon / og-image ）
│
├─ src/
│  ├─ api/               # API 與後端請求相關模組（登入 / 待辦 CRUD）
│  │  ├─ client.js       # axios instance 設定（baseURL、headers 等）
│  │  ├─ request.js      # 封裝 request 方法（統一處理 method / data / error）
│  │  ├─ auth.js         # 登入 / 註冊 API（signIn、signUp）
│  │  └─ todos.js        # 待辦 API（getTodos / createTodo / toggle / update / delete）
│  │
│  ├─ assets/
│  │  ├─ imgs/                 # empty、logo、插圖等
│  │  └─ icons/                # plus / cross / tick 等 icon
│  │
│  ├─ pages/
│  │  ├─ Todo/                         # 待辦頁（Todo List）
│  │  │  ├─ index.jsx                  # 頁面入口：負責組裝整個 Todo 頁面 UI
│  │  │  ├─ useTodoActions.js          # 邏輯集中：狀態管理 + API 動作
│  │  │  ├─ TodoHeader.jsx             # 頁首：Logo + 使用者暱稱 + 登出按鈕
│  │  │  ├─ TodoCreateForm.jsx         # 新增待辦表單：輸入框 + 新增按鈕
│  │  │  ├─ TodoTabs.jsx               # 分頁切換：全部 / 待完成 / 已完成
│  │  │  ├─ TodoTabEmpty.jsx           # 分頁空狀態：依 tab 顯示「沒有待完成/已完成」提示
│  │  │  ├─ TodoListSection.jsx        # 清單區塊：包含 Tabs + List + 底部待完成統計
│  │  │  └─ TodoListItem.jsx           # 單一待辦項目：切換完成、雙擊編輯、刪除按鈕
│  │  │
│  │  ├─ Login/                        # 登入頁（Login）
│  │  │  ├─ index.jsx                  # 頁面入口：負責組裝 Visual + Form
│  │  │  ├─ useLoginActions.js         # 登入邏輯：表單狀態、驗證、送出登入、錯誤訊息
│  │  │  ├─ LoginVisual.jsx            # 左側視覺區：Logo + 插圖
│  │  │  └─ LoginForm.jsx              # 登入表單 UI：Email/密碼欄位 + 提示訊息 + 按鈕
│  │  │
│  │  ├─ Register/             # 註冊頁（拆分：畫面 / 表單 / 行為 hook）
│  │  │  ├─ index.jsx          # Register 頁面整合
│  │  │  ├─ RegisterForm.jsx   # 註冊表單 UI（欄位、錯誤訊息、送出按鈕）
│  │  │  ├─ RegisterVisual.jsx # 左側圖片區塊（Logo / 插圖）
│  │  │  └─ useRegisterActions.js # 註冊流程與驗證
│  │
│  ├─ App.jsx                  # Router 設定與頁面切換
│  ├─ main.jsx                 # 專案入口（HashRouter）
│  └─ index.css                # Tailwind 入口與全域樣式
│
├─ index.html                  # SEO / meta / og tags / favicon
├─ vite.config.js              # Vite 設定（base / plugin）
├─ package.json                # 套件與 scripts（build/deploy）
├─ eslint.config.js            # ESLint 設定
└─ package-lock.json

---

## 專案啟動

### 環境需求（Requirements）
請先確認你的電腦已安裝以下環境：
- Node.js（建議 v18 以上）
- npm（通常會隨 Node.js 一起安裝）

### 安裝與啟動（Clone & Run）
### 1. Clone 專案
```bash
git clone https://github.com/howardxsheng-beep/Todo-list.git
cd Todo-list
```
### 2. 安裝相依套件
```
npm install
```
### 3. 啟動開發環境
```
npm run dev
```