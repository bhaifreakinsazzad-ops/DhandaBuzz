import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light px-6">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold font-heading text-brand-dark mb-2">
              কিছু একটা ভুল হয়েছে
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              পেজটি লোড করতে সমস্যা হচ্ছে। পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-brand-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
