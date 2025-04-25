const express = require('express');
const db = require('../firebase'); // Import Firestore instance

const router = express.Router();

// Add a new task
router.post('/', async (req, res) => {
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ message: 'Task name is required.' });
  }

  try {
    const newTask = {
      name,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('tasks').add(newTask);
    res.status(201).json({ id: docRef.id, ...newTask });
  } catch (err) {
    console.error('Error saving task to Firestore:', err);
    res.status(500).json({ message: 'Failed to save task. Please try again.' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('tasks').get();
    const tasks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched tasks from Firestore:', tasks); // Debug log to verify tasks
    res.status(200).json(tasks); // Return all tasks
  } catch (err) {
    console.error('Error fetching tasks from Firestore:', err);
    res.status(500).json({ message: 'Failed to fetch tasks. Please try again.' });
  }
});

// Edit a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body || {};
  if (!name) {
    return res.status(400).json({ message: 'Task name is required.' });
  }

  try {
    await db.collection('tasks').doc(id).update({ name });
    res.status(200).json({ message: 'Task updated successfully.' });
  } catch (err) {
    console.error('Error updating task in Firestore:', err);
    res.status(500).json({ message: 'Failed to update task. Please try again.' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('tasks').doc(id).delete();
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Error deleting task from Firestore:', err);
    res.status(500).json({ message: 'Failed to delete task. Please try again.' });
  }
});

module.exports = router;
