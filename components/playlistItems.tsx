import NextLink from "next/link";
import { Box, List, ListItem, LinkBox, LinkOverlay } from "@chakra-ui/layout";

const PlayListItems = ({ items }) => (
  <Box marginTop="20px" height="60%" overflowY="auto">
    <List spacing={2}>
      {items.map((item) => (
        <ListItem key={item.id} paddingX="20px" fontSize="16px">
          <LinkBox color="white">
            <NextLink
              href={{ pathname: "/playlist/[id]", query: { id: item.id } }}
              passHref
            >
              <LinkOverlay>{item.name}</LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default PlayListItems;
