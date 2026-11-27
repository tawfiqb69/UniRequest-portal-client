import Link from "next/link";

// The UniRequest logo. Use this one component on every page.
// `onDark` = true when it sits on the brand gradient.
const Logo = ({ onDark = false }) => {
  return (
    <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-white ${
          onDark ? "bg-white/20" : "bg-button-gradient shadow-card"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 10 12 5 2 10l10 5 10-5z" />
          <path d="M6 12v5c3 2 9 2 12 0v-5" />
          <path d="M22 10v6" />
        </svg>
      </span>
      <span className={onDark ? "text-white" : ""}>UniRequest</span>
    </Link>
  );
};

export default Logo;