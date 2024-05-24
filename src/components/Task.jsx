import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";

const Task = ({ task, toggleCompletion, deleteTask }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
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
  );
};

export default Task;