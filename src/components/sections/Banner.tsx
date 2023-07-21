import Heading from "../ui/Heading";

const Banner = ({
  info,
}: {
  info: {
    size: number;
    number: number;
    sharedNumber: number;
  };
}) => {
  return (
    <div className="flex snap-x snap-mandatory   overflow-x-auto  gap-2 ">
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Usage
        </Heading>
        <Heading variant="secondary">Total</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {Math.round(info.size * 100) / 100}MB
        </Heading>
      </div>
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Total Photos
        </Heading>
        <Heading variant="secondary">All time</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {info.number}
        </Heading>
      </div>
      <div className="border rounded-xl py-8 px-6 w-11/12 md:w-1/3 snap-center flex-shrink-0 md:flex-shrink">
        <Heading size="xl" weight="semibold">
          Shared Photos
        </Heading>
        <Heading variant="secondary">Total</Heading>
        <Heading size="xl" weight="bold" className="mt-3">
          {info.sharedNumber}
        </Heading>
      </div>
    </div>
  );
};

export default Banner;
