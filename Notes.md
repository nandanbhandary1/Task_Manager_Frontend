# Notes — Task Tracker Smart

## Database Design

The application uses a single `Task` table to store all task-related information.  
I intentionally kept the schema simple for clarity and efficiency.

**Table: `Task`**
| Field | Type | Description |
|-------|------|--------------|
| id | Integer (Primary Key) | Unique identifier for each task |
| title | String | Task name or short description |
| description | String | Additional details about the task |
| priority | String | Can be “Low”, “Medium”, or “High” |
| due_date | String (YYYY-MM-DD) | Deadline for the task |
| status | String | “Pending” or “Completed” |

All fields are validated before insertion.  
SQLAlchemy ORM automatically handles object mapping and schema creation.

---

## Backend Logic

- The backend is built using **Flask** and **SQLAlchemy**.  
- Core REST endpoints:
  - `POST /tasks` → Add new task  
  - `GET /tasks` → Fetch all tasks  
  - `PATCH /tasks/<id>` → Update task status or details  
  - `DELETE /tasks/<id>` → Remove task  
  - `GET /insights` → Generate a summary (completed, pending, due soon)

- Insights are computed dynamically by counting tasks by status and checking upcoming due dates.  
- All responses are JSON-based for easy frontend integration.

---

## Frontend Logic

- Frontend built using **HTML, CSS, and Vanilla JavaScript** (no framework).  
- Uses **Fetch API** to communicate with backend endpoints.  
- The DOM updates dynamically — no page reloads when adding or updating tasks.  
- Users can:
  - Add a task with title, description, priority, and due date.
  - Mark a task as completed or undo it.
  - Delete tasks when not needed.

---

## Improvements & Future Enhancements

1. **Authentication System:**  
   Allow different users to maintain their own task lists.

2. **Task Filtering & Sorting:**  
   Sort tasks by due date, or filter by priority and completion status.

3. **Notifications or Reminders:**  
   Notify users when tasks are near their due date.

4. **Progress Analytics:**  
   Visualize completed vs pending tasks using simple charts.

5. **Responsive UI:**  
   Improve layout and accessibility for mobile devices.

---

