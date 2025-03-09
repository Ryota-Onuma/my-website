import { ColorModeButton } from "@/app/components/ui/theme";
import { MusicianDuck } from "@/app/components/image";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { Link } from "@/app/components/ui/link";

const Navigations = () => {
  const links = [
    { displayName: "Home", href: "/" },
    { displayName: "About", href: "/about" },
  ];

  return (
    <Box display={"flex"} gap={4}>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.displayName}
        </Link>
      ))}
    </Box>
  );
};

export const Header = () => {
  return (
    <Box
      as="header"
      color="white"
      py={4}
      px={4}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <Box display={"flex"} alignItems={"center"} gap={4}>
        <MusicianDuck width={"40px"} height={"40px"} />
        <Text textStyle={"md"} fontWeight={"bold"}>
          Ryota Onuma
        </Text>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"30px"} height={"40px"}>
        <Navigations />
        <ColorModeButton />
      </Box>
    </Box>
  );
};
