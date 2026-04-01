import ReactGA from "react-ga4";
const UseAnalyticsEventTracker = (category="",action="") => {
  console.log("category ",category," action ",action);
    ReactGA.event({
      category: category,
      action: category,
      label: category,
      value: 1,
    });
    // const eventTracker = (action = "test action", label = "test label") => {
    //   ReactGA.event({category, action, label});
    // }
    // return eventTracker;
}
export default UseAnalyticsEventTracker;