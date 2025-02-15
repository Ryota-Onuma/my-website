import React from "react";
import OriginalNavbarItem from "@theme-original/NavbarItem";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function NavbarItem(props) {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  let modifiedProps = { ...props };

  if (currentLocale === "ja") {
    return <OriginalNavbarItem {...modifiedProps} />;
  }

  // `to` がある場合に、現在のロケールを考慮したURLに変更
  if (props.to) {
    modifiedProps.to = useBaseUrl(`/${currentLocale}${props.to}`);
  }

  return <OriginalNavbarItem {...modifiedProps} />;
}
