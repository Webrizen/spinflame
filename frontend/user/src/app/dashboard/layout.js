import RouteGuard from "@/providers/RouteGuard";
import Link from "next/link";


export default function DashboardLayout({ children }) {
  return (
    <RouteGuard>
      <section className="w-full min-h-screen">
        <div className="container mx-auto py-3">
          <nav className="flex flex-row gap-1 items-center justify-start border-b border-slate-500 py-3 md:mt-0 mt-20 overflow-x-auto">
            <Link href="/dashboard" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Dashboard</Link>
            <span>·</span>
            <Link href="/dashboard/create-events" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Create Event</Link>
            <span>·</span>
            <Link href="/dashboard/manage-events" className="w-min whitespace-nowrap py-2 px-3 rounded text-sm dark:hover:bg-[rgba(225,225,225,0.06)] hover:bg-[rgba(0,0,0,0.06)]">Manage Events</Link>
          </nav>

          <main className="md:p-2 p-0">{children}</main>
        </div>
      </section>
    </RouteGuard>
  )
}