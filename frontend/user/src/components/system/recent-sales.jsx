import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
            <p className="text-sm text-muted-foreground">{event?.name || "Event not started yet!"}</p>
          </div>
          <div className="ml-auto font-medium">{event?.status || "N/A"}</div>
        </div>
      ))}
    </div>
  );
}