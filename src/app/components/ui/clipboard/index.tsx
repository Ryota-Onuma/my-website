import { useClipboard, IconButton } from "@chakra-ui/react";
import { MdContentCopy, MdCheck } from "react-icons/md";

type ClipboardProps = {
  value: string;
};

export const Clipboard = ({ value }: ClipboardProps) => {
  const clipboard = useClipboard({ value: value, timeout: 2000 });

  return (
    <IconButton
      onClick={clipboard.copy}
      variant="solid"
      size="2xs"
      _hover={{ bg: "blue.400" }}
      aria-label="Copy to clipboard"
    >
      {clipboard.copied ? <MdCheck /> : <MdContentCopy />}
    </IconButton>
  );
};
