import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Ignite Gaming`}</title>
    </Helmet>
  );
};

export default MetaData;
