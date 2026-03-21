-- KINETORA OS - DATABASE INITIALIZATION SCRIPT
-- Hostinger Business Plan Compatible

-- TABLA DE USUARIOS
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    avatar_url VARCHAR(255),
    subscription_status ENUM('active', 'past_due', 'canceled') DEFAULT 'canceled',
    subscription_start_date DATE,
    iban_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE TAREAS (PETICIONES)
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    status ENUM('OPEN', 'IN_SPRINT', 'IN_REVIEW', 'DONE') DEFAULT 'OPEN',
    priority ENUM('LOW', 'MED', 'HIGH', 'URGENT') DEFAULT 'MED',
    deadline_requested DATE,
    deadline_final DATE,
    drive_links TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TABLA DE HISTORIAL DE CAMBIOS
CREATE TABLE IF NOT EXISTS task_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    changed_by_id INT,
    change_type VARCHAR(255),
    old_value TEXT,
    new_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- TABLA DE COMENTARIOS
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    user_id INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- TABLA DE ENTREGABLES
CREATE TABLE IF NOT EXISTS deliverables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    file_name VARCHAR(255),
    file_url VARCHAR(255),
    file_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TABLA DE FACTURAS
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    invoice_number VARCHAR(100),
    pdf_url VARCHAR(255),
    amount DECIMAL(10, 2),
    status ENUM('PAID', 'PENDING') DEFAULT 'PENDING',
    due_date DATE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
