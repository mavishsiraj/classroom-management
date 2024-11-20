-- Drop existing triggers if they exist
BEGIN
   EXECUTE IMMEDIATE 'DROP TRIGGER trg_classroom_id';
   EXECUTE IMMEDIATE 'DROP TRIGGER trg_timeslot_id';
   EXECUTE IMMEDIATE 'DROP TRIGGER trg_user_id';
   EXECUTE IMMEDIATE 'DROP TRIGGER trg_schedule_id';
   EXECUTE IMMEDIATE 'DROP TRIGGER trg_booking_id';
EXCEPTION
   WHEN OTHERS THEN NULL; -- Ignore if trigger doesn't exist
END;
/

-- Create the Classrooms Table
CREATE TABLE Classrooms (
    classroom_id NUMBER PRIMARY KEY,
    room_number VARCHAR2(20) NOT NULL,
    capacity NUMBER NOT NULL,
    resources CLOB
);

-- Create the TimeSlots Table
CREATE TABLE TimeSlots (
    timeslot_id NUMBER PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

-- Create the Users Table
CREATE TABLE Users (
    user_id NUMBER PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    email VARCHAR2(100) UNIQUE NOT NULL,
    password VARCHAR2(255) NOT NULL,
    role VARCHAR2(10) CHECK (role IN ('admin', 'student', 'faculty')) NOT NULL
);

-- Create the Schedules Table
CREATE TABLE Schedules (
    schedule_id NUMBER PRIMARY KEY,
    classroom_id NUMBER NOT NULL,
    timeslot_id NUMBER NOT NULL,
    schedule_date DATE NOT NULL,
    status VARCHAR2(10) DEFAULT 'free',
    CONSTRAINT fk_classroom FOREIGN KEY (classroom_id) REFERENCES Classrooms (classroom_id),
    CONSTRAINT fk_timeslot FOREIGN KEY (timeslot_id) REFERENCES TimeSlots (timeslot_id)
);

-- Create the Bookings Table
CREATE TABLE Bookings (
    booking_id NUMBER PRIMARY KEY,
    user_id NUMBER NOT NULL,
    classroom_id NUMBER NOT NULL,
    timeslot_id NUMBER NOT NULL,
    booking_date DATE NOT NULL,
    purpose CLOB,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users (user_id),
    CONSTRAINT fk_classroom_booking FOREIGN KEY (classroom_id) REFERENCES Classrooms (classroom_id),
    CONSTRAINT fk_timeslot_booking FOREIGN KEY (timeslot_id) REFERENCES TimeSlots (timeslot_id)
);

-- Create sequences for auto-increment
CREATE SEQUENCE seq_classroom_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_timeslot_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_user_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_schedule_id START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE seq_booking_id START WITH 1 INCREMENT BY 1;

-- Create triggers to automatically populate primary key fields using sequences

-- Trigger for Classroom table
CREATE OR REPLACE TRIGGER trg_classroom_id
BEFORE INSERT ON Classrooms
FOR EACH ROW
BEGIN
    :new.classroom_id := seq_classroom_id.NEXTVAL;
END;
/

-- Trigger for TimeSlots table
CREATE OR REPLACE TRIGGER trg_timeslot_id
BEFORE INSERT ON TimeSlots
FOR EACH ROW
BEGIN
    :new.timeslot_id := seq_timeslot_id.NEXTVAL;
END;
/

-- Trigger for Users table
CREATE OR REPLACE TRIGGER trg_user_id
BEFORE INSERT ON Users
FOR EACH ROW
BEGIN
    :new.user_id := seq_user_id.NEXTVAL;
END;
/

-- Trigger for Schedules table
CREATE OR REPLACE TRIGGER trg_schedule_id
BEFORE INSERT ON Schedules
FOR EACH ROW
BEGIN
    :new.schedule_id := seq_schedule_id.NEXTVAL;
END;
/

-- Trigger for Bookings table
CREATE OR REPLACE TRIGGER trg_booking_id
BEFORE INSERT ON Bookings
FOR EACH ROW
BEGIN
    :new.booking_id := seq_booking_id.NEXTVAL;
END;
/

-- Insert test data into the tables
INSERT INTO Classrooms (room_number, capacity, resources)
VALUES ('A101', 30, 'Projector, Whiteboard');

INSERT INTO TimeSlots (start_time, end_time)
VALUES (TO_TIMESTAMP('2024-11-18 09:00', 'YYYY-MM-DD HH24:MI'), TO_TIMESTAMP('2024-11-18 11:00', 'YYYY-MM-DD HH24:MI'));

INSERT INTO Users (name, email, password, role)
VALUES ('John Doe', 'john.doe@example.com', 'password123', 'student');

-- Create Bookings for the test data
INSERT INTO Bookings (user_id, classroom_id, timeslot_id, booking_date, purpose)
VALUES (1, 1, 1, TO_DATE('2024-11-18', 'YYYY-MM-DD'), 'Lecture on Database Systems');

-- Commit the changes
COMMIT;
