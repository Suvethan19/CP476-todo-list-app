CREATE DATABASE todo_list_db;
USE todo_list_db;

CREATE TABLE users (
 	user_id INT AUTO_INCREMENT PRIMARY KEY,
 	username VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE lists (
 	list_id INT AUTO_INCREMENT PRIMARY KEY,
 	user_id INT NOT NULL,
 	list_name VARCHAR(100) NOT NULL,
  	CONSTRAINT fk_lists_user
    		FOREIGN KEY (user_id) REFERENCES users(user_id)
    		ON DELETE CASCADE
);

CREATE TABLE tasks (
 	task_id INT AUTO_INCREMENT PRIMARY KEY,
  	list_id INT NOT NULL,
  	task_description VARCHAR(100) NOT NULL,
  	due_date DATE,
  	is_priority TINYINT NOT NULL DEFAULT 0,
  	is_completed TINYINT NOT NULL DEFAULT 0,
  	CONSTRAINT fk_tasks_list
    		FOREIGN KEY (list_id) REFERENCES lists(list_id)
    		ON DELETE CASCADE
  );
  
INSERT INTO users (username) VALUES ('default_user');