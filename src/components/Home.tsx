import Planner from "./Planner";
import Layout from "./Layout";
import {useEffect} from "react";
import ReactGA from 'react-ga4'

const Home = () => {

  useEffect(() => {
    const GaID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID
    if(GaID) {
      ReactGA.initialize([
        {
          testMode: true,
          trackingId: GaID
        }
      ]);
      ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    }
  }, [])

  return(
    <Layout>
      <Planner />
    </Layout>
  )
}

export default Home;
