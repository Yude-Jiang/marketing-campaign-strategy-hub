import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  /** Optional label shown in the error panel to identify which section crashed */
  label?: string;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', this.props.label ?? 'unknown', error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mb-5">
            <AlertTriangle className="w-7 h-7 text-rose-400" />
          </div>
          <h2 className="text-sm font-black text-rose-800 uppercase tracking-widest mb-2">
            {this.props.label ? `${this.props.label} — ` : ''}Something went wrong
          </h2>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6 font-mono">
            {this.state.error.message}
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-[#03234b] text-white px-6 py-3 rounded-xl hover:bg-[#0a3d7a] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
