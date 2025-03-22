import { useState } from "react";
import { ColorModeButton } from "@/app/components/ui/theme";
import { MusicianDuck } from "@/app/components/ui/image";
import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { InternalLink } from "@/app/components/ui/link";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";

const Navigations = () => {
  const links = [
    { displayName: "Home", href: "/" },
    { displayName: "Blog", href: "/tech/posts/" },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="16px" p="16px">
      {links.map((link) => (
        <InternalLink key={link.href} href={link.href}>
          {link.displayName}
        </InternalLink>
      ))}
    </Box>
  );
};

type HamburgerProps = {
  isOpen: boolean;
  onClick: () => void;
};

const Hamburger = ({ isOpen, onClick }: HamburgerProps) => {
  return (
    <Box
      as="button"
      onClick={onClick}
      position="relative"
      width="36px"
      height="36px"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      background="transparent"
      border="none"
      css={{ cursor: "pointer" }}
      p="0"
    >
      {/* 1本目 */}
      <Box
        as="span"
        position="absolute"
        left="50%"
        width="20px"
        height="2px"
        background="currentColor"
        borderRadius="1px"
        transformOrigin="center"
        transition="0.3s ease"
        // 通常時: top=10px, 開時: top=16px + 45度回転
        top={isOpen ? "16px" : "10px"}
        transform={
          isOpen
            ? "translateX(-50%) rotate(45deg)"
            : "translateX(-50%) rotate(0deg)"
        }
      />
      {/* 2本目 */}
      <Box
        as="span"
        position="absolute"
        left="50%"
        width="20px"
        height="2px"
        background="currentColor"
        borderRadius="1px"
        transformOrigin="center"
        transition="0.3s ease"
        // 通常時: top=16px, 開時: opacity=0
        top="16px"
        opacity={isOpen ? 0 : 1}
        transform="translateX(-50%)"
      />
      {/* 3本目 */}
      <Box
        as="span"
        position="absolute"
        left="50%"
        width="20px"
        height="2px"
        background="currentColor"
        borderRadius="1px"
        transformOrigin="center"
        transition="0.3s ease"
        // 通常時: top=22px, 開時: top=16px + -45度回転
        top={isOpen ? "16px" : "22px"}
        transform={
          isOpen
            ? "translateX(-50%) rotate(-45deg)"
            : "translateX(-50%) rotate(0deg)"
        }
      />
    </Box>
  );
};

type HeaderProps = {
  width: string;
  height: string;
};

export const Header = ({ width, height }: HeaderProps) => {
  const { isDesktop } = useMediaQuery();
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useColorMode();
  return (
    <Box
      as="header"
      width={width}
      height={height}
      py={4}
      px={4}
      boxSizing="border-box"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
    >
      {/* ロゴ部分 */}
      <InternalLink href="/">
        <Box display="flex" alignItems="center" gap={4}>
          <MusicianDuck width="40px" height="40px" />
          <Text textStyle="md" fontWeight="bold">
            Ryota Onuma
          </Text>
        </Box>
      </InternalLink>

      {isDesktop ? (
        /* デスクトップ表示 */
        <Box display="flex" alignItems="center" gap="40px">
          <Navigations />
          <ColorModeButton />
        </Box>
      ) : (
        /* モバイル表示 */
        <Box>
          <Hamburger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

          {isOpen && (
            <Box
              position="absolute"
              top={height}
              right="0"
              width="100%"
              bg={isLightMode(colorMode) ? "white" : "black"}
              boxShadow={
                isLightMode(colorMode)
                  ? "0 4px 6px rgba(0,0,0,0.3)"
                  : "0 4px 6px rgba(255,255,255,0.3)"
              }
              borderRadius="8px"
              overflow="hidden"
              // 簡易アニメーション
              opacity={isOpen ? 1 : 0}
              transform={isOpen ? "translateY(0)" : "translateY(-10px)"}
              transition="opacity 0.3s ease, transform 0.3s ease"
              zIndex={999}
            >
              {/* メニュー上部にカラーモード切替ボタン */}
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                p="16px"
                borderBottom="1px solid #eee"
              >
                <ColorModeButton />
              </Box>
              <Navigations />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
