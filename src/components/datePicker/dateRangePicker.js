import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker  } from 'react-date-range';

export default function Index (props) {
    const selectionRange = {
        startDate: props.filterStartDate,
        endDate: props.filterEndDate,
        key: 'selection',
    }
  const handleSelect = (date) => { // native Date object
    props.filterDates(date.selection.startDate, date.selection.endDate)
  }
    return (
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
    )
}
