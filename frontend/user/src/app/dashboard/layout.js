import Link from "next/link";


export default function DashboardLayout({ children }) {
    return (
      <section className="w-full min-h-screen">
        <div className="container mx-auto py-3">
        <nav className="flex flex-row gap-1 items-center justify-start border-b border-slate-500 py-3">
            <Link href="/" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Dashboard</Link>
            <span>·</span>
            <Link href="/" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Create Event</Link>
            <span>·</span>
            <Link href="/" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Manage Events</Link>
            <span>·</span>
            <Link href="/" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Manage Subscriptions</Link>
            <span>·</span>
            <Link href="/" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Settings</Link>
        </nav>
   
        <main className="p-2">{children}</main>
        </div>
      </section>
    )
  }