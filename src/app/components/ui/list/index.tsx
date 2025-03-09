import { List as ChakraUIList, Theme } from "@chakra-ui/react";
import { useColorMode, isLightMode } from "@/app/components/ui/theme";
import { Box } from "@/app/components/ui/box";

type ListProps = {
  as: "ul" | "ol";
  items: React.ReactNode[];
  itemMarkerColor?: string;
};

export const List = ({ as, items, itemMarkerColor }: ListProps) => {
  const { colorMode } = useColorMode();
  return (
    <Theme appearance={colorMode}>
      <Box pl={"20px"}>
        <ChakraUIList.Root as={as}>
          {items.map((item, index) => {
            return (
              <ChakraUIList.Item
                _marker={{
                  color:
                    itemMarkerColor ??
                    (isLightMode(colorMode) ? "black" : "white"),
                }}
                key={index}
              >
                {item}
              </ChakraUIList.Item>
            );
          })}
        </ChakraUIList.Root>
      </Box>
    </Theme>
  );
};
