import GridLoader from "react-spinners/GridLoader";
import '../App.css';

const PagePreloader = ({ loading, size = 150 }) => {
  return (
    <div className="loader">
      <GridLoader color={"#2c63e1"} loading={loading} size={size} />
    </div>
  );
};

export default PagePreloader;
