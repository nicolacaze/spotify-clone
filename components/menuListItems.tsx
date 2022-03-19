import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";

const MenuListItems = ({ items }) => (
  <Box marginBottom="20px">
    <List spacing={2}>
      {items.map((item) => (
        <ListItem key={item.name} paddingX="20px" fontSize="16px">
          <LinkBox color="white">
            <NextLink href={item.route} passHref>
              <LinkOverlay>
                <ListIcon as={item.icon} color="white" marginRight="20px" />
                {item.name}
              </LinkOverlay>
            </NextLink>
          </LinkBox>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default MenuListItems;
