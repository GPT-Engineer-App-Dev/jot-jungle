import { useEffect, useState } from "react";
import { Box, Button, Checkbox, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) console.error("Error fetching tasks:", error);
    else setTasks(data);
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) console.error("Error deleting task:", error);
    else fetchTasks();
  };

  const toggleCompletion = async (id, isCompleted) => {
    const { error } = await supabase.from("tasks").update({ is_completed: !isCompleted }).eq("id", id);
    if (error) console.error("Error updating task:", error);
    else fetchTasks();
  };

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading>Tasks</Heading>
        <Button as={Link} to="/create" colorScheme="teal">Create Task</Button>
      </Flex>
      <VStack spacing={4} align="stretch">
        {tasks.map((task) => (
          <Box key={task.id} p={4} borderWidth="1px" borderRadius="lg">
            <Flex justifyContent="space-between" alignItems="center">
              <Checkbox isChecked={task.is_completed} onChange={() => toggleCompletion(task.id, task.is_completed)}>
                <Text as={task.is_completed ? "del" : undefined}>{task.content}</Text>
              </Checkbox>
              <Flex>
                <Button as={Link} to={`/edit/${task.id}`} mr={2} colorScheme="blue">Edit</Button>
                <Button onClick={() => deleteTask(task.id)} colorScheme="red">Delete</Button>
              </Flex>
            </Flex>
            <Text fontSize="sm" color="gray.500">Deadline: {new Date(task.deadline).toLocaleDateString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default HomePage;