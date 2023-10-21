import { SetStateAction, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import LaunchCard from "../components/card/LaunchCard";
import Paginate from "../components/paginate/Paginate";
import SearchOption from "../components/search/SearchOption";
import { Launch, useLaunchContext } from "../store/LaunchContext";

export default function Home() {
  const { launches, loading } = useLaunchContext();
  const [searchItem, setSearchItem] = useState<Launch[]>([]);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = launches.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="d-grid justify-content-center align-items-center mt-5 pt-5">
        <Spinner animation="grow" className="ms-4" />
        <p>Please wait...</p>
      </div>
    );
  }
  return (
    <Row>
      {/* ============Laucn Card========= */}
      <SearchOption setSearchItem={setSearchItem} />
      {/* ============Laucn Card========= */}
      <Row className="g-3">
        {searchItem.length > 0
          ? searchItem?.map((launch) => (
              <Col sm={12} md={6} lg={4} key={Math.random()}>
                <LaunchCard launch={launch} />
              </Col>
            ))
          : currentItems?.map((launch) => (
              <Col sm={12} md={6} lg={4} key={Math.random()}>
                <LaunchCard launch={launch} />
              </Col>
            ))}
      </Row>

      {/* ============ pagination ========= */}
      <Paginate
        currentPage={currentPage}
        totalItems={launches.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Row>
  );
}
