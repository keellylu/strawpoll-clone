import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Link, useColorMode } from "@chakra-ui/react";
import React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack justify="space-between" as="nav" py={6}>
      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
      <HStack spacing={4}>
        <Link href="https://github.com/keellylu/strawpoll-clone">GitHub</Link>
        <Link cursor="not-allowed">Pricing</Link>
      </HStack>
    </HStack>
  );
};
