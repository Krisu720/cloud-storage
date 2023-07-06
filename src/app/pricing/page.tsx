import PricingCard from "@/components/PricingCard";
import { pricingCards } from "@/utils/mockData";


const page = ({}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-12 lg:mt-28 mt-12">
        <div className="text-center">
          <h1 className="text-5xl dark:text-white font-extrabold tracking-tighter">
            Pricing
          </h1>
          <p className="text-lg text-gray-500 font-semibold">
            Choose plan which you are intresed in!
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {pricingCards.map((item,index) => (
            <PricingCard
              index={index}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
