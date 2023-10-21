import { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header />
      <Container className="my-2" style={{ minHeight: "80vh" }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
