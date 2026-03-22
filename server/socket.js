import { query } from "../database/db.js";

export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a specific task room
    socket.on("join-task", (taskId) => {
      socket.join(`task-${taskId}`);
      console.log(`User joined room: task-${taskId}`);
    });

    // Handle new comments with persistence
    socket.on("send-comment", async (data) => {
      const { taskId, text, sender, timestamp, userId } = data;
      
      try {
        // Persist to MySQL
        await query(
          "INSERT INTO comments (task_id, user_id, message, created_at) VALUES (?, ?, ?, ?)",
          [taskId, userId || 1, text, timestamp || new Date()]
        );

        // Retransmit to everyone in the task room
        io.to(`task-${taskId}`).emit("new-comment", {
          taskId,
          text,
          sender,
          timestamp: timestamp || new Date().toISOString()
        });

        // Global notification for badges
        io.emit("unread-notification", { taskId, sender });
      } catch (error) {
        console.error("Error saving comment:", error);
      }
    });

    // Handle task updates (Status, Priority, etc.)
    socket.on("update-task", async (data) => {
      const { taskId, updates, userId, changeType, oldValue, newValue } = data;
      
      try {
        // 1. Update the task record
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(", ");
        const values = [...Object.values(updates), taskId];
        await query(`UPDATE tasks SET ${fields} WHERE id = ?`, values);

        // 2. Log to history (Audit)
        if (changeType) {
          await query(
            "INSERT INTO task_history (task_id, changed_by_id, change_type, old_value, new_value) VALUES (?, ?, ?, ?, ?)",
            [taskId, userId || 1, changeType, oldValue?.toString(), newValue?.toString()]
          );
        }

        // 3. Broadcast update to other clients
        socket.to(`task-${taskId}`).emit("task-updated", { taskId, updates, changeType });
        // Also broadcast to the board for status moves
        io.emit("board-task-updated", { taskId, updates });

      } catch (error) {
        console.error("Error updating task:", error);
      }
    });

    // Handle subtask updates
    socket.on("update-subtask", async (data) => {
      const { taskId, subtask, action } = data;
      // action can be 'add', 'toggle', 'delete'
      
      try {
        if (action === 'add') {
          await query(
            "INSERT INTO subtasks (id, task_id, title, is_done) VALUES (?, ?, ?, ?)",
            [subtask.id, taskId, subtask.title, subtask.isDone]
          );
        } else if (action === 'toggle') {
          await query(
            "UPDATE subtasks SET is_done = ? WHERE id = ?",
            [subtask.isDone, subtask.id]
          );
        } else if (action === 'delete') {
          await query("DELETE FROM subtasks WHERE id = ?", [subtask.id]);
        }

        // Broadcast to sync checklists
        io.to(`task-${taskId}`).emit("subtask-synced", { taskId, subtask, action });
      } catch (error) {
        console.error("Error syncing subtask:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
