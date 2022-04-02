import { Box, Flex } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  return (
    <Box bg="gray.900" padding="10px" height="100%">
      <Flex align="center">
        {activeSong ? (
          <Box flexBasis="20%" padding="20px" color="white">
            <Text fontSize="lg">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box flex={1} color="white">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
