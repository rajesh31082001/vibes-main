import {
  Button,
  Flex,
  Image,
  Link,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  return (
    <Flex justifyContent={"space-between"} mt={6} mb="12">
      {user && (
        <Link as={RouterLink} to="/">
          <Tooltip
            label="Home"
            openDelay={100}
            closeDelay={200}
            // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
          >
            <Link as={RouterLink} to="/">
              <AiFillHome size={24} />
            </Link>
          </Tooltip>
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("login")}
        >
          Login
        </Link>
      )}

      <Tooltip
        label="Vibes"
        openDelay={100}
        closeDelay={200}
        // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
      >
        <Image
          cursor={"pointer"}
          alt="logo"
          w={6}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          onClick={toggleColorMode}
        />
      </Tooltip>

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <Tooltip
              label="Profile"
              openDelay={100}
              closeDelay={200}
              // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
            >
              <span>
                <RxAvatar size={24} />
              </span>
            </Tooltip>
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <Tooltip
              label="Messaging"
              openDelay={100}
              closeDelay={200}
              // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
            >
              <span>
                <BsFillChatQuoteFill size={20} />
              </span>
            </Tooltip>
          </Link>
          <Link as={RouterLink} to={`/settings`}>
            <Tooltip
              label="Settings"
              openDelay={100}
              closeDelay={200}
              // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
            >
              <span>
                <MdOutlineSettings size={20} />
              </span>
            </Tooltip>
          </Link>
          <Button size={"xs"} onClick={logout}>
            <Tooltip
              label="Log Out"
              openDelay={100}
              closeDelay={200}
              // contentProps={{ css: { "--tooltip-bg": "tomato" } }}
            >
              <span>
                <FiLogOut size={20} />
              </span>
            </Tooltip>
          </Button>
        </Flex>
      )}

      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
