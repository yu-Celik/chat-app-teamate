"use client";
import { Box } from "@mui/material";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";


export function CardBio() {
  return (
    <Box 
    component={'article'}
    >
    <CardContainer className="">
      <CardBody className=" relative hover:shadow-2xl hover:shadow-orangePV-300 bg-bluePV-1000  h-auto rounded p-4  ">
        <CardItem
          as="p"
          translateZ="60"
          className="text-slate-200 text-base "
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, aliquam quae! Tenetur ipsam quaerat dolorum cum odio, voluptas, sed possimus laborum eius numquam quas ut enim alias, debitis provident. Unde?
        </CardItem>
      </CardBody>
    </CardContainer>
    </Box>
  );
}
