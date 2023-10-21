import { useLaunchContext } from "../store/LaunchContext";

export default function Home() {
  const { launches } = useLaunchContext();
  console.log(launches);
  return <div>Home</div>;
}
