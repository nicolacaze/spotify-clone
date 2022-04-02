import {
  ButtonGroup,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatDuration } from "../lib/formatter";

const Player = ({ songs, activeSong }) => {
  const [isPlaying, setPlaying] = useState(true);
  const [index, setIndex] = useState(
    songs.findIndex((song) => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isRepeatMode, setRepeatMode] = useState(false);
  const [isShuffleMode, setShuffleMode] = useState(false);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);
  const isRepatModeRef = useRef(isRepeatMode);

  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffleMode((state) => !state);
  };

  const onRepeat = () => {
    setRepeatMode((state) => !state);
  };

  // const skipPrevious = () => {
  //   const activeSongIndex = songs.findIndex(
  //     (song) => song.id === activeSong.id
  //   );
  //   if (activeSongIndex === 0) {
  //     setActiveSong(songs[0]);
  //   } else {
  //     setActiveSong(songs[activeSongIndex - 1]);
  //   }
  // };

  const skipPrevious = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  };

  const skipNext = () => {
    setIndex((state: any) => {
      if (isShuffleMode) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return skipNext();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (isRepatModeRef) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      skipNext();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (event) => {
    setSeek(parseFloat(event[0]));
    soundRef.current.seek(event[0]);
  };

  useEffect(() => {
    let timerId;
    if (isPlaying && !isSeeking) {
      const f = () => {
        setSeek(soundRef ? soundRef.current.seek() : 0);
        timerId = requestAnimationFrame(f);
      };
      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [isPlaying, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    isRepatModeRef.current = isRepeatMode;
  }, [isRepeatMode]);

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={isPlaying}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
            color={isShuffleMode ? "white" : "gray.600"}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip previous"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={skipPrevious}
          />
          {isPlaying ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={skipNext}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            color={isRepeatMode ? "white" : "gray.600"}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box flexBasis="10%">
            <Text fontSize="xs">{formatDuration(seek)}</Text>
          </Box>
          <Box flex={1}>
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box flexBasis="10%" textAlign="right">
            <Text fontSize="xs">{formatDuration(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
