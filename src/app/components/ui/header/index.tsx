import { ColorModeButton } from "@/app/components/ui/theme";
import { MusicianDuck } from "@/app/components/image";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { Link } from "@/app/components/ui/link";
import { L } from "node_modules/react-router/dist/development/route-data-H2S3hwhf.d.mts";

type LinkData = {
  displayName: string;
  href: string;
};

export const Header = () => {
  const links: LinkData[] = [
    { displayName: "Home", href: "/" },
    { displayName: "About", href: "/about" },
  ];

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
        <Box display={"flex"} gap={8}>
          {links.map((link) => (
            <Link key={link.displayName} href={link.href} variant="plain">
              <Text key={link.displayName} textStyle={"md"} fontWeight={"bold"}>
                {link.displayName}
              </Text>
            </Link>
          ))}
        </Box>
        <ColorModeButton />
      </Box>
    </Box>
  );
};
