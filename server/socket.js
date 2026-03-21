export const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a specific task room
    socket.on("join-task", (taskId) => {
      socket.join(`task-${taskId}`);
      console.log(`User joined room: task-${taskId}`);
    });

    // Handle new comments
    socket.on("send-comment", (data) => {
      const { taskId, text, sender, timestamp } = data;
      
      // En un escenario real, aquí guardaríamos el comentario en la DB MySQL
      // Por ahora, lo retransmitimos a todos en la sala del task
      io.to(`task-${taskId}`).emit("new-comment", {
        taskId,
        text,
        sender,
        timestamp: timestamp || new Date().toISOString()
      });

      // También podríamos emitir una notificación global para los badges
      io.emit("unread-notification", { taskId, sender });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
