import { Fragment } from 'react';
import { useRouter } from 'next/router';

import { getFilteredEvents } from '../../utils/api-utils';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {

  if (props.invalidFilter) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }


  if (props.notEventsFound) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context){
  
  const { params } = context;
  const [filteredYear, filteredMonth] = params.slug;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ){
    return {
      props : { invalidFilter : true }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return{
      props : { notEventsFound : true }
    }
  }



  return {
    props : {
      filteredEvents,
      numYear,
      numMonth
    }
  }
}

export default FilteredEventsPage;
