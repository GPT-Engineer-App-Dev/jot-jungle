import { Container, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Notes App</Text>
        <Text>Manage your tasks efficiently.</Text>
        <Button as={Link} to="/" colorScheme="teal">Go to Tasks</Button>
      </VStack>
    </Container>
  );
};

export default Index;
