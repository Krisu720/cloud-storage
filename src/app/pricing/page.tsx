import PricingCard from "@/components/PricingCard";
import Heading from "@/components/ui/Heading";
import { pricingCards } from "@/utils/mockData";


const page = ({}) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-12 lg:mt-28 mt-12">
        <div className="text-center">
          <Heading size="title" weight="extrabold">
            Pricing
          </Heading>
          <Heading size="lg" variant="secondary" weight="semibold">
            Choose plan which you are intresed in!
          </Heading>
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
