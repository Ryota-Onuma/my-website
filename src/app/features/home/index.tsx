import { Box } from "@/app/components/ui/box";
import { Text } from "@/app/components/ui/text";
import { ExternalLink } from "@/app/components/ui/link";
import { List } from "@/app/components/ui/list";

type SectionProps = {
  heading: string;
  children: React.ReactNode;
};

const Section = ({ heading, children }: SectionProps) => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Text textStyle="2xl" fontWeight="extrabold">
        {heading}
      </Text>
      <Box display="flex" flexDirection="column" gap={4}>
        {children}
      </Box>
    </Box>
  );
};

const SNSLinks: React.ReactNode[] = [
  <ExternalLink
    href="https://x.com/onuma_ryota"
    hoverStyle={{ textDecoration: "underline" }}
  >
    <Text>X(@onuma_ryota)</Text>
  </ExternalLink>,
  <ExternalLink
    href="https://github.com/Ryota-Onuma?tab=overview"
    hoverStyle={{ textDecoration: "underline" }}
  >
    <Text>GitHub(@Ryota-Onuma)</Text>
  </ExternalLink>,
  <ExternalLink
    href="https://zenn.dev/ryota_onuma"
    hoverStyle={{ textDecoration: "underline" }}
  >
    <Text>Zenn</Text>
  </ExternalLink>,
];

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" gap={"50px"} padding={12}>
      <Section heading="こんにちは👋">
        <Text>私のポートフォリオサイトへようこそ</Text>
        <Text>
          本サイトでは私のアウトプットなどを掲載しています。自由にご覧ください。
        </Text>
      </Section>

      <Section heading="About Me">
        <Text>Ryota Onuma</Text>
        <Text>
          長野県出身。現在は東京でソフトウェアエンジニアとして活動中。
        </Text>
        <Text>業務ではバックエンドを中心にフルスタックに開発しています。</Text>
      </Section>

      <Section heading="SNS">
        <Text>各種リンクはこちら</Text>
        <Box>
          <List items={SNSLinks} as="ul" />
        </Box>
      </Section>
    </Box>
  );
};

export default Home;
