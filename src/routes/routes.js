import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import FrontLayoutRoutes from "./frontend/frontRoutes";
import { Confirmation } from "../components";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../environment/index.js";
const Home = React.lazy(() => import("../container/frontend/home"));
const Booking = React.lazy(() => import("../container/frontend/booking"));
const BookingList = React.lazy(() =>
  import("../container/frontend/bookingList")
);
const BookingConfirm = React.lazy(() =>
  import("../container/frontend/bookingConfirm")
);
const RoomDetails = React.lazy(() =>
  import("../container/frontend/roomDetails")
);
const Blog = React.lazy(() => import("../container/frontend/blog"));
const FAQS = React.lazy(() => import("../container/frontend/FAQs"));
const BlogList = React.lazy(() => import("../container/frontend/blogList"));
const MyAccount = React.lazy(() => import("../container/frontend/myAccount"));
const Gallery = React.lazy(() => import("../container/frontend/gallery"));
const Login = React.lazy(() => import("../container/frontend/auth/authModal"));
const MarketPlace = React.lazy(() =>
  import("../container/frontend/marketPlace")
);
const PrivacyPolicy = React.lazy(() =>
  import("../container/frontend/privacyPolicy")
);
const NoData = React.lazy(() => import("../container/frontend/noData"));
const Decline = React.lazy(() => import("../container/frontend/decline"));
const Campaign = React.lazy(() => import("../container/frontend/campaign"));

ReactGA.initialize(TRACKING_ID);
function Routes(props) {
  useEffect(() => {
    //redirect to home page when page is refresh
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
      title: window.location.pathname,
    });
    var url = document.URL.split("/");
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      props.getSessionIDStart();
    }
    // const isRefreshed = window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD;
    // if (isRefreshed) {
    //   let domLink=url[0]+"//"+url[2];

    //   if(url[4]=='blog-list' || url[4]=='my-account'){
    //     window.location.replace(url[0]+"//"+url[2]+'/'+url[3]+'/'+url[4]);
    //   }
    //   else if(url[3]=='booking-detail'||url[3]=='blog'){
    //     window.location.replace(url[0]+"//"+url[2]+'/'+url[3]);
    //   }
    //   else if(url[4]=='booking' || url[4]=='room'){
    //     window.location.replace(url[0]+"//"+url[2]+'/'+url[3]+'/'+url[4]+'/'+url[5]);
    //   }

    //   else{
    //     window.location.replace(domLink);
    //   }
    // }
  }, []);

  return (
    <Router>
      <Switch>
        <FrontLayoutRoutes
          exact
          path="/"
          routeName={"home"}
          render={(matchprops) => <Home {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/dashboard/:token?"
          routeName={"home"}
          render={(matchprops) => <Home {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/booking-detail/:token?"
          routeName={"booking"}
          render={(matchprops) => <Booking {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/home/booking/booking-list"
          routeName={"bookingList"}
          render={(matchprops) => <BookingList {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/booking-confirm/:id?"
          routeName={"bookingConfirm"}
          render={(matchprops) => <BookingConfirm {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/home/room/room-details"
          routeName={"roomDetails"}
          render={(matchprops) => <RoomDetails {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/blog"
          routeName={"blog"}
          render={(matchprops) => <Blog {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/faqs"
          render={(matchprops) => <FAQS {...matchprops} />}
          routeName={"faq"}
        />
        <FrontLayoutRoutes
          exact
          path="/home/blog-list"
          render={(matchprops) => <BlogList {...matchprops} />}
          routeName={"blogList"}
        />
        <FrontLayoutRoutes
          exact
          path="/home/my-account"
          render={(matchprops) => <MyAccount {...matchprops} />}
          routeName={"myAccount"}
        />
        <FrontLayoutRoutes
          exact
          path="/gallery"
          render={(matchprops) => <Gallery {...matchprops} />}
          routeName={"gallery"}
        />
        <FrontLayoutRoutes
          exact
          path="/login"
          render={(matchprops) => <Login {...matchprops} />}
          routeName={"Login"}
        />
        <FrontLayoutRoutes
          exact
          path="/market-place"
          routeName={"marketPlace"}
          render={(matchprops) => <MarketPlace {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/policies/:policyName"
          routeName={"privacyPolicy"}
          render={(matchprops) => <PrivacyPolicy {...matchprops} />}
        />
        <FrontLayoutRoutes
          exact
          path="/no-data"
          render={(matchprops) => <NoData {...matchprops} />}
          routeName={"Nodata"}
        />
        <FrontLayoutRoutes
          exact
          path="/decline"
          render={(matchprops) => <Decline {...matchprops} />}
          routeName={"Decline"}
        />
        <FrontLayoutRoutes
          exact
          path="/campaign"
          render={(matchprops) => <Campaign {...matchprops} />}
          routeName={"Campaign"}
        />
      </Switch>
      <Confirmation />
    </Router>
  );
}
const mapStateToProps = ({ cmsReducer }) => {
  const {} = cmsReducer;
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSessionIDStart: (data) => dispatch(actions.getSessionID(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
