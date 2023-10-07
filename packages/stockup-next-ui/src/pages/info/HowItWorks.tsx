import { Link } from "react-router-dom";
import SUFooter from "../../components/SUFooter";
import { v4 as uuidv4 } from 'uuid';

export default function HowItWorks() {
  return (
    <div className="w-full ">
      <div className="h-full z-0 w-full px-14 lg:px-72 ">
        <div className="w-full py-14">
          <b className="text-[44px] py-7 font-sans  text-[rgb(60,72,88)]">
            How It Works
          </b>
          <div className="flex flex-col lg:flex-row   gap-2 py-7">
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="rgb(24,20,48)"
                  width="52"
                  height="52"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01l-1.97 5.67c-.07.21-.11.43-.11.66v7.16c0 .83.67 1.5 1.5 1.5S6 20.33 6 19.5V19h12v.5c0 .82.67 1.5 1.5 1.5.82 0 1.5-.67 1.5-1.5v-7.16c0-.22-.04-.45-.11-.66l-1.97-5.67zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.27-3.82c.14-.4.52-.68.95-.68h9.56c.43 0 .81.28.95.68L19 11H5z" />
                </svg>
              </div>
              <h3 className="mt-7">
                {" "}
                Set your preferences based on the types of vehicles you're
                currently looking for{" "}
              </h3>
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
                  viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 13c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v10zm-6-7c.55 0 1-.45 1-1s-.45-1-1-1h-1v-.01c0-.55-.45-1-1-1s-1 .45-1 1V8h-1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3v1h-3c-.55 0-1 .45-1 1s.45 1 1 1h1c0 .55.45 1 1 1s1-.45 1-1h1c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1h-3v-1h3z" />
                </svg>
              </div>
              <h3 className="mt-7">
                {" "}
                Place bids on vehicles you want, and monitor auctions in real
                time{" "}
              </h3>
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
                  viewBox="0 0 24 24">
                  <path d="M10 16V8c0-1.1.89-2 2-2h9V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-1h-9c-1.11 0-2-.9-2-2zm3-8c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h9V8h-9zm3 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
              </div>
              <h3 className="mt-7">
                {" "}
                When you win a bid, we'll make it easy by handling delivery and
                final transaction details{" "}
              </h3>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <b className="text-[44px] py-7 font-sans  text-[rgb(60,72,88)]">
            Contact With Us
          </b>
          <h3 className="py-7 text-gray-500">
            Have questions? Need help? Just want to drop in and say hi? We’d
            love to hear from you! Contact your StockUp team via any of the
            methods below, or simply chat with us using the chat icon in the
            bottom right corner of your screen.
          </h3>
          <div className="flex flex-col lg:flex-row   gap-2 py-7">
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col  items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="52"
                  height="52"
                  color="rgb(24,20,48)">
                  <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                </svg>
              </div>

              <h3 className="mt-20">(801) 332-8380</h3>
            </div>
            <div className=" bg-[rgb(24,20,48)] text-white w-full lg:w-1/3 h-80 px-7 text-center flex flex-col items-center justify-center">
              <div className="bg-white flex items-center justify-center rounded-full w-[110px] h-[110px] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="52"
                  height="52"
                  color="rgb(24,20,48)">
                  <path d="M20 3h-7c-.55 0-1 .45-1 1v9l3-3h5c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zm-.77 12.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                </svg>
              </div>
              <h3 className="mt-20">(801) 332-8380</h3>
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
                  viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z" />
                </svg>
              </div>
              <h3 className="mt-20 ">info@stockupsolutions.com</h3>
            </div>
          </div>
        </div>
        <div className="mt-7 border p-4 border-gray-300  w-full  shadow-md">
          <h1 className="text-4xl ">FAQs</h1>
          <div className="py-2 w-full h-full pt-7 grid grid-cols-2 gap-4">
            {questionAnswers.map((questionAnswer) => (
              <div key={uuidv4()} className="">
                <p style={{ fontWeight: "bold" }}>{questionAnswer.q}</p>
                <p className="text-gray-600">{questionAnswer.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="py-14" />
      </div>
      <SUFooter />
    </div>
  );
}

const questionAnswers = [
  {
    q: "Do you offer Condition Reports with each vehicle",
    a: "Yes. Condition reports and condition ratings will be issued for each vehicle following the NAAA Guidelines",
  },
  {
    q: "Do I have to arrange pick up of the vehicles?",
    a: "We’ll take care of the transportation. You’ll hear from your Dealer Success Manager once your bid is accepted, and they’ll schedule a delivery time.",
  },
  {
    q: "Can we pick up the vehicles if we don’t want to pay the transportation cost?",
    a: "Absolutely. We can coordinate a closer pickup if the seller is located closer to your store.",
  },
  {
    q: "How will I get the title and other paperwork?",
    a: "Your Dealer Success Manager will make sure you receive it when the vehicle is delivered. If the title is not present, it will be mailed to the address you have provided for titles.",
  },
  {
    q: "Will you share the seller’s information with me so I can try to sell them a replacement vehicle?",
    a: " If they’re looking to purchase another vehicle, we’ll send them in to you.",
  },
  {
    q: "What if the vehicle is leased or there’s a lien on it?",
    a: "To make it easy, we’ll handle the paperwork and payoffs for you in those situations",
  },
  {
    q: "What if something is wrong with the vehicle?",
    a: (
      <>
        We work hard to ensure the Condition Report is accurate. We adhere to
        the NAAA Arbitration Policy and tag each vehicle with the appropriate
        light color so you know what you’re buying. In the event that something
        is inaccurate, your Dealer Success Manager will work directly with you
        to resolve it quickly and fairly.{" "}
        <Link className="text-[rgb(188,114,204)]" to="/arbitration-policy">
          Click here to read our full arbitration policy.
        </Link>
      </>
    ),
  },
  {
    q: "What are the fees?",
    a: (
      <>
        With each bid you place, you will see the associated Buy Fee and
        Transportation Cost for that particular vehicle. You can also reference
        the{" "}
        <Link className="text-[rgb(188,114,204)]" to="/fee-schedule">
          Fee Schedule here
        </Link>
      </>
    ),
  },
  {
    q: "I already have people calling classifieds. Why would I use you?",
    a: "We’re looking at the local classifieds, but we’re also building a local brand around buying from consumers, which allows us to reach a lot of inventory you won’t find in your local listings. Using StockUp will actually save your sales staff time so they can focus on generating sales, while we focus on getting you great inventory. Our experienced team personally meets with the seller, verifies the current condition of the vehicle, and because we’re a third party we’re able to set realistic pricing expectations. If they’re interested in buying a replacement vehicle, we’ll refer them to you directly.",
  },
  {
    q: "How do I pay for the vehicle?",
    a: "An ACH will automatically be initiated from your account for the total amount agreed to when placing your bid, which includes total vehicle cost, buy fee, and transportation fee. We’ll email the invoice to the accounting email(s) you provide to us.",
  },
];
