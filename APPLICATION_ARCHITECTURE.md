# NestHub Application Architecture & Data Flow

This document provides a high-level overview of the NestHub hostel management application, detailing its purpose, routing mechanisms, and data handling strategies.

## 1. Application Overview

**NestHub** is a comprehensive hostel management system designed to streamline administration and enhance the resident (student) experience. The application caters to two primary user roles:
- **Admin**: Manages students, allocates rooms, tracks payments, handles complaints, reviews visitor passes, and posts notices.
- **Student**: Views their profile, checks room details, pays rent/invoices, raises maintenance complaints, applies for leaves, and requests visitor passes.

The application is built using Next.js 14, leveraging App Router features, React components for the frontend, and Zustand (via `store/` directory) for global state management.

---

## 2. Navigation & Routing Structure

Navigation throughout the application is managed via Next.js App Router and controlled by a central `middleware.js`.

### 2.1 Route Organization
- **`(public) /`**: Landing and general public-facing pages.
- **`/(public)/login`**: Authentication portal for both students and admins.
- **`/admin/*`**: Admin dashboard and management modules (Students, Rooms, Payments, Complaints, Visitors, Notices).
- **`/student/*`**: Student dashboard and personal modules (Profile, Invoices, Complaints, Leaves, Visitor Passes).

### 2.2 Access Control & Middleware
The application's routing security is handled by `middleware.js`:
1. **Authentication Check**: The middleware intercepts incoming requests and checks for an authentication token/cookie (e.g., `nesthub_auth`).
2. **Protected Routes**: Paths beginning with `/admin`, `/student`, and `/home` are protected. If an unauthenticated user attempts to access these paths, they are redirected to the `/login` page.
3. **Role-Based Redirection**: Once authenticated, the user's role (Admin vs. Student) dictates which dashboard they are navigated to. Logged-in users attempting to access the `login` page or root `/` are automatically redirected to their respective protected home screens.

---

## 3. Data Flow & State Management

The frontend consumes RESTful APIs (as defined in `API_SPECIFICATION.md`) and manages state locally to provide a smooth, responsive UI.

### 3.1 Backend Integration (API Consumption)
Data reading and manipulation follow standard HTTP methods:
- **`GET`**: Used to fetch lists (with query parameters for pagination/filtering e.g., `?page=1&limit=10&status=active`) and individual records (e.g., fetching profile via `/api/profile/me`).
- **`POST`**: Used to create new entities (e.g., adding a student, posting a notice, submitting a leave application). Payload formats differ: standard JSON for text-only endpoints, and `multipart/form-data` for endpoints involving file uploads (e.g., profile avatars, complaint attachments).
- **`PUT`/`PATCH`**: Used to update existing entities or change statuses (e.g., assigning a complaint, reviewing a visitor pass).

### 3.2 State Management
- **Zustand Stores (`store/`)**: 
  - `authStore.js`: Handles global user authentication state, token storage, login/logout actions, and current user profile details across the application.
  - `uiStore.js`: Manages global UI states such as sidebar toggles, modal visibility (e.g., Request Visitor Pass Modal), and global toasts/notifications.
- **Local Component State**: React `useState` and `useReducer` are used within individual pages and components (like Data Tables, Filters, and Input Forms) to manage isolated behaviors (e.g., typing in a search bar, toggling a dropdown) that don't need to be accessible globally.

### 3.3 Typical Data Lifecycle Request
1. **Initial Load**: A user navigates to `/admin/students`. The component mounts and dispatches a fetch request to `/api/students`.
2. **Loading State**: The UI store or local state displays a loading spinner/skeleton.
3. **Response**: Data returns from the backend. The component maps the data into the Student List View.
4. **Action**: Admin clicks "Add Student", triggering the `uiStore` to open the Add Student Modal.
5. **Form Submission**: Admin fills the form. On submit, a `POST` request is sent. Upon success, the modal closes, a success toast fires, and the student list is refreshed to reflect the newly added data.
