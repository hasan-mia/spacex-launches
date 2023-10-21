import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { Launch, useLaunchContext } from "../../store/LaunchContext";

interface SearchItemProps {
  setSearchItem: Dispatch<SetStateAction<any[]>>;
}

type TimeFrame = "lastWeek" | "lastMonth" | "lastYear";

const SearchOption: React.FC<SearchItemProps> = ({ setSearchItem }) => {
  const { launches, loading } = useLaunchContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [upComming, setUpComming] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>("");

  // handle search
  const handleSearch = useCallback(() => {
    if (searchTerm.length > 2) {
      const filterData = launches?.filter(
        (d) =>
          d?.rocket?.rocket_name?.toLowerCase() === searchTerm?.toLowerCase(),
      );
      setSearchItem(filterData);
    }
  }, [setSearchItem, launches, searchTerm]);

  // handle upcomming
  const handleUpcomming = useCallback(() => {
    if (upComming) {
      const filterData = launches?.filter((d) => d?.upcoming === upComming);
      setSearchItem(filterData);
    }
  }, [setSearchItem, launches, upComming]);

  // handle launch by status
  const handleStatusChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    const status = event.target.value;
    setSelectedStatus(event.target.value);
    const filterData = launches?.filter((d) => {
      if (status === "true") {
        return d.launch_success === true;
      } else if (status === "false") {
        return d.launch_success === false;
      }
      return true;
    });
    setSearchItem(filterData);
  };

  // handle launch by date
  const filterLaunchesByDate = (
    launchesData: Launch[],
    timeFrame: TimeFrame,
  ): Launch[] => {
    const currentDate = new Date();
    const timeFrameMap: Record<TimeFrame, number> = {
      lastWeek: 7,
      lastMonth: 30,
      lastYear: 365,
    };

    const filteredLaunches = launchesData.filter((launch) => {
      const launchDate = new Date(launch.launch_date_utc);
      const timeDiff = Math.abs(currentDate.getTime() - launchDate.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      return daysDiff <= timeFrameMap[timeFrame];
    });

    return filteredLaunches;
  };

  const handleTimeFrameChange = (event: { target: { value: any } }) => {
    const selectedValue = event.target.value;
    setSelectedTimeFrame(selectedValue);
    let filteredLaunches: Launch[] = [];
    if (selectedValue === "lastWeek") {
      filteredLaunches = filterLaunchesByDate(launches, "lastWeek");
    } else if (selectedValue === "lastMonth") {
      filteredLaunches = filterLaunchesByDate(launches, "lastMonth");
    } else if (selectedValue === "lastYear") {
      filteredLaunches = filterLaunchesByDate(launches, "lastYear");
    }
    setSearchItem(filteredLaunches);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
  useEffect(() => {
    handleUpcomming();
  }, [handleUpcomming]);
  return (
    <>
      <Col xs={12}>
        <Row className="gy-3 gy-md-0 mt-md-3 mb-md-5">
          <Col sm={12} md={4}>
            <InputGroup className="mt-0 mt-md-5">
              <Form.Control
                placeholder="Search..."
                aria-label="search"
                aria-describedby="search"
                className="outline-none shaddow-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="outline-none bg-primary text-white"
                id="search"
                onClick={handleSearch}
                disabled={loading}
              >
                <BsSearch />
              </Button>
            </InputGroup>
          </Col>
          <Col sm={12} md={4}>
            <Form.Select
              aria-label="By Launch Status"
              className="mt-0 mt-md-5"
              onChange={handleStatusChange}
              value={selectedStatus}
            >
              <option>By Launch Status</option>
              <option value="false">Failure</option>
              <option value="true">Success</option>
            </Form.Select>
          </Col>
          <Col sm={12} md={4}>
            <Form>
              <Form.Check
                id="default"
                label="Show upcoming only"
                onClick={() => setUpComming(!upComming)}
              />
            </Form>
            <Form.Select
              aria-label="By Launch Date"
              className="mt-4"
              onChange={handleTimeFrameChange}
              value={selectedTimeFrame}
            >
              <option>By Launch Date</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </Form.Select>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default SearchOption;
