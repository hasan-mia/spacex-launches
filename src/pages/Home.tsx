import { Col, Row, Spinner } from "react-bootstrap";
import LaunchCard from "../components/card/LaunchCard";
import Paginate from "../components/paginate/Paginate";
import SearchOption from "../components/search/SearchOption";
import { useLaunchContext } from "../store/LaunchContext";

export default function Home() {
  const { launches, loading } = useLaunchContext();
  if (loading) {
    return (
      <div className="d-grid justify-content-center align-items-center mt-5 pt-5">
        <Spinner animation="grow" className="ms-4" />
        <p>Please wait...</p>
      </div>
    );
  }
  console.log(launches);
  return (
    <Row>
      {/* ============Laucn Card========= */}
      <SearchOption />
      {/* ============Laucn Card========= */}
      <Row className="g-3">
        {launches?.map((launch) => (
          <Col sm={12} md={6} lg={4} key={Math.random()}>
            <LaunchCard launch={launch} />
          </Col>
        ))}
      </Row>

      {/* ============ pagination ========= */}
      <Paginate />
    </Row>
  );
}
