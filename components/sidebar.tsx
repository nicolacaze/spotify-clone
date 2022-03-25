import NextImage from "next/image";
import { Box, Divider } from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

import MenuListItems from "./menuListItems";
import PlayListItems from "./playlistItems";
import { usePlaylist } from "../lib/hooks";

const primaryMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const secondaryMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  const { playlists } = usePlaylist();
  return (
    <Box width="100%" height="100%" bg="black" paddingX="5px">
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" width={120} height={60} />
        </Box>
        <MenuListItems items={primaryMenu} />
        <MenuListItems items={secondaryMenu} />
        <Divider bg="gray.400" />
        <PlayListItems items={playlists} />
      </Box>
    </Box>
  );
};

export default Sidebar;
