import { createBulkTasks, createTask } from '@/lib/tasks';

// To create all tasks for a user
export async function setupUserTasks(userId: string) {
  try {
    await createBulkTasks(userId);
    console.log('Successfully created tasks for user:', userId);
  } catch (error) {
    console.error('Failed to create tasks:', error);
  }
}

// To create a single task
export async function handleNewTask(userId: string) {
  try {
    const newTask = await createTask({
      userId,
      title: 'New presentation task',
      tool: 'create presentation',
      transcript: 'Sample transcript content',
    });
    console.log('Created new task:', newTask);
  } catch (error) {
    console.error('Failed to create task:', error);
  }
} 