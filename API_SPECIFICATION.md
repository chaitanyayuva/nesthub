# NestHub Backend API Specification

This document outlines the required REST APIs to power the NestHub frontend. All endpoints should return data in JSON format and accept JSON payloads (except where multipart/form-data is specified for file uploads).

---

## 1. Authentication & Users

### **POST** `/api/auth/login`
- **Purpose**: Authenticate user and return a JWT token.
- **Payload**: `{"email": "admin@nesthub.in", "password": "password", "role": "admin|student"}`
- **Response**: `{"token": "jwt_string", "user": { "id": "U1", "name": "...", "role": "admin", "avatar": "url" }}`

### **GET** `/api/profile/me`
- **Purpose**: Fetch the logged-in user's profile details.
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `{"id": "...", "name": "...", "role": "...", "institution": "...", "room": "...", "hostel": "...", "avatar": "..."}`

---

## 2. Students Management

### **GET** `/api/students`
- **Purpose**: Fetch all students with pagination and filtering. 
- **Query Params**: `?search=&page=1&limit=10&status=active`
- **Response**: `{"data": [{ "id": "NH2025001", "name": "Rahul Kumar", "room": "301" }], "total": 45}`

### **POST** `/api/students`
- **Purpose**: Register a new student (from the Add Student wizard).
- **Payload (multipart/form-data)**: 
  - **Fields**: `fullName`, `rollNo`, `email`, `phone`, `institution`, `course`, `year`, `roomNo`, `block`, `checkInDate`, `rentAmount`, `guardianName`, `guardianPhone`, `idType`, `idNumber`
  - **Files**: `avatar` (Image)
- **Response**: `{"message": "Student created successfully", "studentId": "NH2025001"}`

---

## 3. Rooms & Occupancy

### **GET** `/api/rooms/floors`
- **Purpose**: Get all floors for filtering.
- **Response**: `[{ "id": "f1", "name": "Ground Floor" }, { "id": "f2", "name": "First Floor" }]`

### **GET** `/api/rooms`
- **Purpose**: Fetch rooms based on floor or search.
- **Query Params**: `?floorId=f1`
- **Response**: `[{ "id": "101", "number": "101", "status": "Occupied", "capacity": 2, "occupants": 2, "type": "AC", "price": 8000, "residents": [{ "name": "Rahul", "avatar": "url" }] }]`

---

## 4. Payments & Billing

### **GET** `/api/payments/invoices`
- **Purpose**: Get the invoice ledger for the admin (with filters).
- **Query Params**: `?status=Paid|Pending|Overdue&month=April 2025`
- **Response**: `[{ "invoiceId": "INV-123", "studentName": "...", "amount": 9500, "status": "Paid" }]`

### **POST** `/api/payments/record`
- **Purpose**: Admin records a payment manually.
- **Payload**: `{"studentId": "S123", "amount": 8000, "month": "April 2025", "method": "UPI", "remarks": "..."}`
- **Response**: `{"message": "Payment recorded successfully", "invoiceId": "INV-124"}`

### **POST** `/api/payments/process`
- **Purpose**: Student initiates a payment via a gateway.
- **Payload**: `{"invoiceId": "INV-123", "amount": 8000, "method": "Card"}`
- **Response**: `{"gatewayUrl": "https://pg...", "transactionId": "TXN..."}`

---

## 5. Complaints & Support

### **GET** `/api/complaints`
- **Purpose**: Fetch support tickets (filter by student for student view, all for admin view).
- **Query Params**: `?status=Open|Assigned|Resolved`
- **Response**: `[{ "id": "TKT-123", "title": "...", "category": "Plumbing", "priority": "P2", "status": "Open", "studentName": "Rahul", "room": "301" }]`

### **POST** `/api/complaints`
- **Purpose**: Student raises a new ticket.
- **Payload (multipart/form-data)**: 
  - **Fields**: `category`, `priority`, `subject`, `description`
  - **Files**: `attachment` (Image)
- **Response**: `{"message": "Ticket created", "ticketId": "TKT-124"}`

### **PUT** `/api/complaints/:id/assign`
- **Purpose**: Admin assigns staff to a complaint.
- **Payload**: `{"staffId": "STF-01", "priority": "High", "instructions": "..."}`
- **Response**: `{"message": "Assigned successfully"}`

---

## 6. Visitor Management

### **GET** `/api/visitors`
- **Purpose**: View visitor logs and pending requests.
- **Response**: `[{ "id": "V-11", "visitorName": "...", "relation": "Parent", "studentName": "Rahul", "date": "2025-04-10", "time": "14:00", "status": "Pending" }]`

### **POST** `/api/visitors`
- **Purpose**: Student requests a visitor pass.
- **Payload**: `{"visitorName": "Anil", "visitorPhone": "987...", "relation": "parent", "purpose": "Visit", "date": "2025-04-10", "time": "14:00", "notes": "..."}`
- **Response**: `{"message": "Pass requested successfully"}`

### **PUT** `/api/visitors/:id/review`
- **Purpose**: Admin approves or rejects a visitor pass.
- **Payload**: `{"status": "Approved|Rejected", "remarks": "..."}`
- **Response**: `{"message": "Visitor pass updated"}`

---

## 7. Notices & Announcements

### **GET** `/api/notices`
- **Purpose**: Retrieve notices.
- **Response**: `{"pinned": [...], "recent": [...]}`

### **POST** `/api/notices`
- **Purpose**: Admin posts a new notice.
- **Payload**: `{"title": "...", "category": "Event", "priority": "High", "description": "...", "audience": "All Students", "expiry": "2025-04-20"}`
- **Response**: `{"message": "Notice posted"}`

---

## 8. Student Leaves

### **GET** `/api/leaves`
- **Purpose**: Get leave history.
- **Response**: `[{ "id": "LV1", "reason": "Home Visit", "fromDate": "2025-04-01", "toDate": "2025-04-03", "status": "Approved" }]`

### **POST** `/api/leaves`
- **Purpose**: Student submits a leave application.
- **Payload**: `{"reasonId": "home", "fromDate": "2025-04-01", "toDate": "2025-04-03", "details": "..."}`
- **Response**: `{"message": "Leave submitted"}`