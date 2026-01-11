import { RichText } from "@/components/sanity/RichText";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getActiveActions, getUpcomingEvents } from "@/lib/sanity/queries";

export default async function ActionCenterPage() {
  const [actions, events] = await Promise.all([
    getActiveActions(),
    getUpcomingEvents(),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">Take action</p>
        <h1 className="text-3xl font-semibold">Hearings, votes, and scripts</h1>
        <p className="text-muted-foreground">
          Speak up with the latest calls, emails, and meeting details.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Action alerts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(actions ?? []).map((item) => (
            <Card key={item._id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="capitalize">
                  {item.urgency ?? "medium"} priority
                </CardDescription>
                {item.deadline && (
                  <p className="text-xs text-muted-foreground">
                    Deadline: {new Date(item.deadline).toLocaleString()}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {item.description ? (
                  <RichText value={item.description} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Details coming soon.
                  </p>
                )}
                {item.callScript && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium">Call script</p>
                    <RichText value={item.callScript} />
                  </div>
                )}
                {item.emailTemplate && (
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-sm font-medium">Email template</p>
                    <RichText value={item.emailTemplate} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {(actions ?? []).length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>No active actions</CardTitle>
                <CardDescription>
                  Check back soon for scripts and upcoming votes.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Upcoming events</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(events ?? []).map((event) => (
            <Card key={event._id}>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription className="capitalize">
                  {event.type ?? "event"} •{" "}
                  {event.date
                    ? new Date(event.date).toLocaleString()
                    : "Date TBD"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Location: {event.location}
                </p>
                {event.description ? (
                  <RichText value={event.description} />
                ) : null}
                {event.actionUrl && (
                  <a
                    href={event.actionUrl}
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    More info
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
          {(events ?? []).length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>No events yet</CardTitle>
                <CardDescription>
                  We’ll post council hearings and committee meetings here.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
