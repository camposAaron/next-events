import { Fragment } from 'react';
import Head from 'next/head';
import { getAllEvents, getEventById, getFeaturedEvents } from '../../utils/api-utils';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({ event }) {

  if (!event) {
    return (
      <div>
        <p>...loading!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={`${event.title} will develop on ${event.date} located at ${event.location}, we'll hope to see you there!.`}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const eventSelected = await getEventById(params.eventId);

  return {
    props: {
      event: eventSelected
    },
    revalidate: 30
  }
}

export async function getStaticPaths(context) {
  const events = await getFeaturedEvents();
  const eventsIds = events.map(e => ({ params: { "eventId": e.id } }));

  return {
    paths: eventsIds,
    fallback: true
  }
}

export default EventDetailPage;