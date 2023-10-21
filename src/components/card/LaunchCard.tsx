import { Card } from "react-bootstrap";
import CardImg from "../../assets/card.png";
import { Launch } from "../../store/LaunchContext";
interface LaunchCardProps {
  launch: Launch;
}
const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options,
    );
    return formattedDate;
  };
  return (
    <Card className="d-flex justify-content-center align-items-center">
      <div style={{ width: "124px", height: "124px" }} className="mt-4">
        <img
          src={launch?.links?.mission_patch || CardImg}
          alt="card"
          className="img-fluid"
        />
      </div>
      <div className="text-center d-grid align-items-center justify-content-center mt-4">
        <p>Launch Date: {formatDate(launch?.launch_date_utc)}</p>
        <h3>{launch?.mission_name}</h3>
        <p>{launch?.rocket?.rocket_name}</p>
        <h5 className="text-gray">Launch Status:</h5>
        <div className="w-100 d-flex justify-content-center mb-3">
          {launch?.launch_success ? (
            <p className="bg-success text-white px-1">Success</p>
          ) : (
            <p className="bg-danger text-white px-1">Failed</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LaunchCard;
