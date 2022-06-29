import React from "react";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
export default function Page400() {
  return (
    <Box p={4}>
      <Box mb={1}> PAGE NOT FOUND</Box>
      <Box>
        <Link href="/">
          <a>
            <Button variant="filled">BACK TO HOME</Button>
          </a>
        </Link>
      </Box>
    </Box>
  );
}
