import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const CreateTaskPage = () => {
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  const createTask = async () => {
    const { error } = await supabase.from("tasks").insert([{ content, deadline }]);
    if (error) console.error("Error creating task:", error);
    else navigate("/");
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Task Content</FormLabel>
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Deadline</FormLabel>
          <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </FormControl>
        <Button onClick={createTask} colorScheme="teal">Create Task</Button>
      </VStack>
    </Box>
  );
};

export default CreateTaskPage;