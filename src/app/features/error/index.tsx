import { Text } from "@/app/components/ui/text";
import { Box } from "@/app/components/ui/box";
import { Button } from "@/app/components/ui/button";

import { minBodyHeight } from "@/app/consts/style";

import { InternalLink } from "@/app/components/ui/link";

type ErrorPageProps = {
  statusCode: number;
  shortDescription: string;
  longDescription: string;
};

export const ErrorNotFound = ({
  statusCode,
  shortDescription,
  longDescription,
}: ErrorPageProps) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height={minBodyHeight}
        width="100%"
        boxSizing="border-box"
        gap={8}
      >
        <Text as="h1" fontSize="8xl" mb="16px">
          {statusCode}
        </Text>
        <Text as="h2" fontSize="3xl" mb="8px">
          {shortDescription}
        </Text>
        <Text as="p" fontSize="md" mb="24px">
          {longDescription}
        </Text>
        <InternalLink
          href="/"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          <Button>ホームに戻る</Button>
        </InternalLink>
      </Box>
    </>
  );
};

export default ErrorNotFound;
