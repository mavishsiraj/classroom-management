const db = require('../config/db');

// Add a new classroom
exports.addClassroom = async (classroom_name, capacity) => {
    const [result] = await db.execute(
        'INSERT INTO Classrooms (classroom_name, capacity) VALUES (?, ?)',
        [classroom_name, capacity]
    );
    return result;
};

// Get all classrooms
exports.getClassrooms = async () => {
    const [rows] = await db.execute('SELECT * FROM Classrooms');
    return rows;
};
