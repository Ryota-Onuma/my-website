import React, { ReactNode } from "react";
import { NotFoundError } from "@/app/lib/error";
import ErrorFeature from "@/app/features/error";
import { Base } from "@/app/routes/layout";
import { useLocation } from "react-router-dom";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // エラー報告サービスへの送信など
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error instanceof NotFoundError) {
        return (
          <Base>
            <ErrorFeature
              statusCode={404}
              shortDescription="Not Found"
              longDescription="お探しのページは存在しません。URL
          が間違っているか、もしくはページが削除された可能性があります。"
            />
          </Base>
        );
      }
      return (
        <Base>
          <ErrorFeature
            statusCode={500}
            shortDescription="Internal Server Error"
            longDescription="エラーが発生しました。"
          />
        </Base>
      );
    }
    return this.props.children;
  }
}

type ErrorBoundaryProviderProps = {
  children: ReactNode;
};

const ErrorBoundaryProvider = ({ children }: ErrorBoundaryProviderProps) => {
  const location = useLocation();
  return <ErrorBoundary key={location.pathname}>{children}</ErrorBoundary>;
};

export default ErrorBoundaryProvider;
