import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


// Function to get the color class based on status
function getStatusColor(status) {
  switch (status) {
    case 'pending':
      return 'bg-red-100 text-red-500';
    case 'started':
      return 'bg-blue-100 text-blue-500';
    case 'finished':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-slate-100 text-slate-500';
  }
}

export function RecentSales({ data }) {
  return (
    <div className="space-y-8">
      {data.map((event, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/500x500" alt="Avatar" />
            <AvatarFallback>{event?.winner?.name || "Event not started yet!"}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {event?.winner?.name || "Event not started yet!"}
            </p>
            <p className="text-sm dark:text-slate-400 text-slate-800">{event?.name || "Event not started yet!"}</p>
          </div>
          <div className={`ml-auto px-3 py-1 rounded-xl text-xs font-medium ${getStatusColor(event?.status)}`}>{event?.status || "N/A"}</div>
        </div>
      ))}
    </div>
  );
}