import { useNavigate } from "react-router-dom";
import SUButton from "../../components/SUButton";
import SUFooter from "../../components/SUFooter";
import { useAuth } from "../../context/AuthProvider";

export default function Contact() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full ">
      <div className="h-full z-0 w-full px-14 lg:px-72 ">
        <div className="md:w-1/2 text-center py-14">
          <b className="text-[44px] py-7 font-sans  text-[rgb(60,72,88)] ">
            About StockUp
          </b>
          <p className="my-7">
            StockUp was founded to give dealers an efficient way to access the
            30+ million vehicles sold by consumers every year. We give you
            easier access to more cars. There’s no subscription fee, and no
            financial obligation until you purchase a vehicle — just like at
            other auctions.
          </p>
          <SUButton
            onClick={() => {
              auth ? navigate("/inventory") : navigate("/auth/signin");
            }}
            className="bg-[rgb(24,20,48)]"
          >
            GET STARTED
          </SUButton>
        </div>
        <div className="" />
        <div className="w-full ">
          <b className="text-[44px] py-7 font-sans  text-[rgb(60,72,88)]">
            Contact With Us
          </b>

          <div className="flex flex-col lg:flex-row   gap-2 py-7">
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col  items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="52"
                  height="52"
                  color="rgb(24,20,48)"
                >
                  <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                </svg>
              </div>

              <h3 className="mt-20">(630) 642-6811</h3>
            </div>
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="52"
                  height="52"
                  color="rgb(24,20,48)"
                >
                  <path d="M20 3h-7c-.55 0-1 .45-1 1v9l3-3h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-.77 12.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                </svg>
              </div>
              <h3 className="mt-20">(630) 642-6811</h3>
            </div>
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="rgb(24,20,48)"
                  width="52"
                  height="52"
                  fill="currentColor"
                  className="bi bi-car-front-fill"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z" />
                </svg>
              </div>
              <h3 className="mt-20 ">info@stockupsolutions.com</h3>
            </div>
          </div>
        </div>
      </div>
      <SUFooter />
    </div>
  );
}
