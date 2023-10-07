import { useNavigate } from "react-router-dom";
import DetailedCR from "../../assets/img/detailed-cr.png";
import PotentialSales from "../../assets/img/potential-sales.png";
import SimpleOnlineBiding from "../../assets/img/simple-online-biding.png";
import SUFooter from "../../components/SUFooter";
import carParkStockup from "../../images/car-park-stockup.jpeg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full overflow-y-scroll">
      <div
        className="bg-cover h-[87%] flex flex-col  items-center justify-center"
        style={{
          backgroundColor: "#181430",
          background:
            `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.35)), url(${
            carParkStockup
            })`,
        }}
      >
        <div className="w-full p-0 lg:px-96  flex flex-col justify-center ">
          <span className=" text-5xl  text-center text-white break-words">
            Buy from consumers as easily as you buy from auction
          </span>
        </div>
        <button
          onClick={() => {
            navigate("/auth/signup");
          }}
          className=" bg-white w-52 mt-14 h-14 text-sm hover:bg-blue-700 hover:text-white duration-300"
        >
          {" "}
          REGISTER FOR FREE{" "}
        </button>
      </div>
      <div className="w-full h-full flex flex-col ">
        <div className="w-full py-7  flex justify-center">
          <span className="text-3xl text-[rgb(60,72,88)] ">
            Why Use StockUp?
          </span>
        </div>
        <div className="w-full md:flex-row justify-center flex flex-col gap-2 py-7">
          <div
            className="w-full md:w-[400px]  bg-[rgb(24,20,48)] text-white  flex flex-col items-center justify-center text-center font-light text-sm px-1 mx-1 pb-3"
          >
            <img
              className="w-[150px] h-[150px]"
              src={SimpleOnlineBiding}
              alt="img"
             />
            <div className="text">
              <span className="text-lg fony-normal">Simple Online Bidding</span>
              <br />
              Easily bid online and buy from the 30 million consumers who sell a
              vehicle every year. We handle the transportation and paperwork to
              make the buying process seamless.
            </div>
          </div>
          <div
            className="w-full md:w-[400px] bg-[rgb(24,20,48)] text-white   flex flex-col items-center justify-center text-center font-light text-sm px-1 mx-1 pb-3"
          >
            <img
              className="w-[150px] h-[150px]"
              src={DetailedCR}
              alt="img"
             />
            <div className="text">
              <span className="text-lg fony-normal">
                Detailed Condition Reports
              </span>
              <br />
              Each vehicle includes a 0 to 5 CR grade and detailed Condition
              Report that is verified by StockUp before the transaction is
              completed.
            </div>
          </div>
          <div
            className=" w-full md:w-[400px] bg-[rgb(24,20,48)] text-white  flex flex-col items-center justify-center text-center font-light text-sm px-2 mx-1 pb-3"
          >
            <img
              className="w-[150px] h-[150px]"
              src={PotentialSales}
              alt="img"
             />
            <div className="text">
              <span className="text-lg fony-normal">Potential Sales</span>
              <br />
              When StockUp consumer customers are looking to purchase a vehicle,
              we refer them to dealers in our network at no cost.
            </div>
          </div>
        </div>

        <div className="w-full  h-full  justify-center flex items-center py-14 md:my-0">
          <div className="bg-[rgb(24,20,48)] w-[1125px] text-white md:flex-row  items-center justify-between px-14 flex flex-col">
            <div className="w-1/2">
              <h3 className="text-xl">About StockUp</h3>
              <br />
              <p className="text-sm">
                StockUp was founded to enable dealers to efficiently access the
                30+ million vehicles sold by consumers every year in the U.S.
                This allows dealers to quickly acquire unique inventory from
                private sellers as easily as they buy from auction every day.
              </p>
              <button
                onClick={() => {
                  navigate("/contact");
                }}
                className=" bg-white w-40 text-black mt-14 h-12 text-sm hover:bg-[rgb(24,20,48)] hover:text-white duration-300"
              >
                {" "}
                CONTACT US
              </button>
            </div>
            <div className="aboutImgDiv">
              <img src={DetailedCR} alt="img" />
            </div>
          </div>
        </div>
        <SUFooter />
      </div>
    </div>
  );
}
