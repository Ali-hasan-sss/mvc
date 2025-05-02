import ChatMessage from "../common/chatMessage";
const messages = [
  {
    message: "Search for suppliers using advanced filters.",
    image: "images/theme_search.png",
    bg: "bg-[#BF1E2E]",
  },
  {
    message: "Browse profiles and compare available options.",
    image: "images/message2.png",
    bg: "bg-black",
  },
  {
    message:
      "Contact the supplier directly or place a purchase order through the website administration.",
    image: "images/message3.png",
    bg: "bg-[#006D77]",
  },
  {
    message: "Complete your transaction securely through our platform.",
    image: "images/messge4.png",
    bg: "bg-[#F5A623CC]",
  },
];

export default function HowStarted() {
  return (
    <div className="flex flex-col w-full px-2 py-10 mt-10 md:px-20  gap-3">
      {messages.map((msg, index) => (
        <div
          className={`flex w-3/4 md:w-2/3 ${index % 2 === 1 ? "self-end" : ""}`}
          key={index}
        >
          <ChatMessage message={msg.message} bg={msg.bg} image={msg.image} />
        </div>
      ))}
      <div className="border-[3px] border-gray-400 flex items-center justify-center px-1 md:px-4 py-4 mt-20 rounded-xl">
        <p className="font-bold text-sm text-center md:text-lg">
          {" "}
          Start your business journey today – explore suppliers and get the
        </p>
      </div>
    </div>
  );
}
