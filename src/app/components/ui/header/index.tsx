import { ColorModeButton } from "@/app/components/ui/theme";
import { MusicianDuck } from "@/app/components/image";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { InternalLink } from "@/app/components/ui/link";

const Navigations = () => {
  const links = [
    { displayName: "Home", href: "/" },
    { displayName: "About", href: "/about" },
  ];

  return (
    <Box display={"flex"} gap="20px">
      {links.map((link) => (
        <InternalLink key={link.href} href={link.href}>
          {link.displayName}
        </InternalLink>
      ))}
    </Box>
  );
};

type HeaderProps = {
  width: string;
  height: string;
};

export const Header = ({ width, height }: HeaderProps) => {
  return (
    <Box
      as="header"
      color="white"
      width={width}
      height={height}
      py={4}
      px={4}
      boxSizing={"border-box"}
      display={"flex"}
      justifyContent={"space-between"}
    >
      <InternalLink href={"/"}>
        <Box display={"flex"} alignItems={"center"} gap={4}>
          <MusicianDuck width={"40px"} height={"40px"} />
          <Text textStyle={"md"} fontWeight={"bold"}>
            Ryota Onuma
          </Text>
        </Box>
      </InternalLink>
      <Box display={"flex"} alignItems={"center"} gap={"60px"} height={"40px"}>
        <Navigations />
        <ColorModeButton />
      </Box>
    </Box>
  );
};
