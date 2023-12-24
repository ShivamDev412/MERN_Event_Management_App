import "react-toastify/dist/ReactToastify.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
interface Props {
  children: any;
}
const MainWrapper = ({ children }: Props) => {
  return (
    <>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default MainWrapper;
