import { FC } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextImage from "next/image";
import { useReducer } from "react";
import { useSWRConfig } from "swr";
import {
  SET_EMAIL,
  SET_PASSWORD,
  IS_LOADING,
  RESET_FORM,
} from "../lib/actionTypes";
import { auth } from "../lib/mutations";

const initialState = {
  email: "",
  password: "",
  isLoading: false,
};

const reducer = (state, action) => {
  if (action.type === SET_EMAIL) {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  if (action.type === SET_PASSWORD) {
    return {
      ...state,
      password: action.payload.password,
    };
  }
  if (action.type === IS_LOADING) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === RESET_FORM) {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  }
};

const AuthForm: FC<{ mode: string }> = ({ mode }) => {
  const [form, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const updateEmail = (e) => {
    dispatch({ type: SET_EMAIL, payload: { email: e.target.value } });
  };

  const updatePassword = (e) => {
    dispatch({ type: SET_PASSWORD, payload: { password: e.target.value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: IS_LOADING });
    await auth(mode, {
      email: form.email,
      password: form.password,
    });
    dispatch({ type: RESET_FORM });
    router.push("/");
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" width={120} height={60} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              marginBottom="20px"
              onChange={updateEmail}
            />
            <Input
              placeholder="Password"
              type="password"
              marginBottom="20px"
              onChange={updatePassword}
            />
            <Button
              type="submit"
              bg="green.500"
              sx={{
                "&:hover": {
                  bg: "green.400",
                },
              }}
              isLoading={form.isLoading}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
