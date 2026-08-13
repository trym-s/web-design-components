import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onError?: (message: string) => void;
}

export class ErrorBoundary extends Component<Props, { message: string | null }> {
  state = { message: null as string | null };

  static getDerivedStateFromError(e: any) {
    return { message: e?.message ?? String(e) };
  }

  componentDidCatch(e: any) {
    this.props.onError?.(e?.message ?? String(e));
  }

  render() {
    if (this.state.message) {
      return (
        <div className="pv-error">
          <strong>needs shim</strong>
          <pre>{this.state.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
