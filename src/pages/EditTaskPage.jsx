import { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const EditTaskPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    const { data, error } = await supabase.from("tasks").select("*").eq("id", id).single();
    if (error) console.error("Error fetching task:", error);
    else {
      setContent(data.content);
      setDeadline(data.deadline);
    }
  };

  const updateTask = async () => {
    const { error } = await supabase.from("tasks").update({ content, deadline }).eq("id", id);
    if (error) console.error("Error updating task:", error);
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
        <Button onClick={updateTask} colorScheme="teal">Update Task</Button>
      </VStack>
    </Box>
  );
};

export default EditTaskPage;