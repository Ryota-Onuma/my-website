import ErrorFeature from "@/app/features/error";

const PageNotFound = () => {
  return (
    <ErrorFeature
      statusCode={404}
      shortDescription="Not Found"
      longDescription="お探しのページは存在しません。URL
が間違っているか、もしくはページが削除された可能性があります。"
    />
  );
};

export default PageNotFound;
