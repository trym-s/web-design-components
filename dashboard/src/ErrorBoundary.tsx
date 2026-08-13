import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onError?: (message: string) => void;
  /** Compact replacement for contexts too small for the full error block. */
  fallback?: ReactNode;
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
      if (this.props.fallback !== undefined) return this.props.fallback;
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
