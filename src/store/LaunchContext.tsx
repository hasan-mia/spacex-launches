/* eslint-disable prettier/prettier */
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchLaunches } from "./api/api";

export interface Core {
  core_serial: string;
  flight: number;
  block: number | null;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  land_success: boolean | null;
  landing_intent: boolean;
  landing_type: string | null;
  landing_vehicle: string | null;
}

export interface Payload {
  payload_id: string;
  norad_id: number[];
  reused: boolean;
  customers: string[];
  nationality: string;
  manufacturer: string;
  payload_type: string;
  payload_mass_kg: number;
  payload_mass_lbs: number;
  orbit: string;
  orbit_params: {
    reference_system: string;
    regime: string;
    longitude: number | null;
    semi_major_axis_km: number | null;
    eccentricity: number | null;
    periapsis_km: number;
    apoapsis_km: number;
    inclination_deg: number;
    period_min: number | null;
    lifespan_years: number | null;
    epoch: string | null;
    mean_motion: number | null;
    raan: number | null;
    arg_of_pericenter: number | null;
    mean_anomaly: number | null;
  };
}

export interface SecondStage {
  block: number;
  payloads: Payload[];
}

export interface Fairings {
  reused: boolean;
  recovery_attempt: boolean;
  recovered: boolean;
  ship: string | null;
}

export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: {
    cores: Core[];
  };
  second_stage: SecondStage;
  fairings: Fairings;
}

export interface Links {
  mission_patch: string;
  video_link: string;
}

export interface Timeline {
  webcast_liftoff: number;
}

export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window: number;
  rocket: Rocket;
  ships: string[];
  telemetry: any;
  launch_site: any;
  launch_success: boolean;
  launch_failure_details: any;
  links: Links;
  details: string;
  static_fire_date_utc: string;
  static_fire_date_unix: number;
  timeline: Timeline;
  crew: any;
}

export interface ApiError {
  message: string;
  code: number;
}

export interface LaunchProviderProps {
  children: ReactNode;
}

export interface LaunchContextValue {
  launches: Launch[];
  loading: boolean;
  error: ApiError | null;
}

const LaunchContext = createContext<LaunchContextValue | undefined>(undefined);

export const useLaunchContext = () => {
  const context = useContext(LaunchContext);
  if (!context) {
    throw new Error("useLaunchContext must be used within a LaunchProvider");
  }
  return context;
};

export const LaunchProvider: React.FC<LaunchProviderProps> = ({ children }) => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLaunches();
        console.log(data);
        setLaunches(data);
        setLoading(false);
      } catch (error: unknown) {
        if (isApiError(error)) {
          setError(error);
        } else {
          setError({ message: "An unknown error occurred", code: 500 });
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  function isApiError(error: unknown): error is ApiError {
    return (
      (error as ApiError).message !== undefined &&
      (error as ApiError).code !== undefined
    );
  }

  return (
    <LaunchContext.Provider value={{ launches, loading, error }}>
      {children}
    </LaunchContext.Provider>
  );
};
