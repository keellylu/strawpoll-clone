import { Box, Button, useColorMode } from "@chakra-ui/react";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button variant="ghost" size="sm" onClick={toggleColorMode}>
        Enable {colorMode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </Box>
  );
};
