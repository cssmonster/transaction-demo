import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Page500() {
  return (
    <Box p={4}>
      <Box mb={1}>ERROR HAPPENS !</Box>
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
