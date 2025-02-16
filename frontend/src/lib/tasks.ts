import { supabase } from './supabase';

type TaskInput = {
  title: string;
  tool: string;
  transcript: string;
  userId: string;
};

export async function createBulkTasks(userId: string) {
  const tasks = [
    {
      title: 'Create a presentation discussing the topic of love for China',
      tool: 'create presentation',
      transcript: 'yo yo yo can you make a presentation with me and trying to talk about how I love China',
    },
    {
      title: 'Follow up with Carter for further details.',
      tool: 'make a call',
      transcript: 'do you know Carter',
    },
    {
      title: 'Create slideshow based on the provided information',
      tool: 'create presentation',
      transcript: 'because every second it transcribes it should be sending it to you like for example create me a slideshow create me a slideshow',
    },
    {
      title: 'Complete the task after the meeting concludes',
      tool: 'notion',
      transcript: 'let me do it after after the meeting is done so it gives you the whole context clues okay',
    },
    {
      title: 'Create a slideshow about how Stanford is one of the best',
      tool: 'create presentation',
      transcript: '[7:09:54 PM] hi my name is Edison \n[7:09:58 PM]  what\"s my name bro\n[7:10:03 PM] you\"re supposed to say something you don\"t have to say your name\n[7:10:05 PM]  okay anything else\n[7:10:14 PM]  reading this whole orchestration with zoom and Dan\n[7:10:15 PM]  yeah\n[7:10:21 PM]  I wanted to create a slideshow about how Stanford is one of the best universities in the world\n[7:12:44 PM] like not sending real time is it not streaming well it is streaming but I don\"t want it to stream I wanted to be once the meeting\"s over everything gets sent over to\n[7:12:46 PM]  I think it\"s better to keep streaming\n[7:12:55 PM]  because we wanted to execute actions while we are on the meeting rather than after the meeting\n[7:13:05 PM]  and since we\"re able to do that why not just do that stuff\n[7:13:06 PM]  Ricardo\n[7:13:09 PM]  do I have to execute during the meeting or after the meeting\n[7:13:35 PM]  like your whole point of a zoom call is just pay attention to them so you don\"t have to worry about the other stuff after the meeting is done then you can do it\n[7:13:40 PM]  just get to work on you\n[7:13:45 PM]  can you make a make a PowerPoint that says Stanford\"s the best school',
    },
    {
      title: 'Create a presentation about unicorns and rainbows',
      tool: 'create presentation',
      transcript: '[7:20:49 PM] yo chuck chuck\n[7:20:56 PM]  if you want to make a flashlight\n[7:20:57 PM]  about\n[7:21:02 PM]  can you make a slideshow about unicorns and rainbows please\n',
    },
  ];

  const { data, error } = await supabase
    .from('tasks')
    .insert(
      tasks.map(task => ({
        user_id: userId,
        title: task.title,
        tool: task.tool,
        transcript: { transcript: task.transcript },
        approve: false,
      }))
    );

  if (error) {
    console.error('Error inserting tasks:', error);
    throw error;
  }

  return data;
}

// Function to create a single task
export async function createTask({ title, tool, transcript, userId }: TaskInput) {
  const { data, error } = await supabase
    .from('tasks')
    .insert([
      {
        user_id: userId,
        title,
        tool,
        transcript: { transcript },
        approve: false,
      },
    ])
    .select();

  if (error) {
    console.error('Error inserting task:', error);
    throw error;
  }

  return data[0];
}
