import { FC } from "react";
import { BadgeCheck, BadgeX } from "lucide-react";
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
        <div className="container mx-auto grid lg:grid-cols-3 gap-12">
          <div className="border border-gray-500 rounded-lg flex flex-col mx-6 lg:mx-0 p-6">
            <h1 className="text-4xl dark:text-white font-bold">
              500MB storage
            </h1>
            <p className="text-lg text-gray-500">
              For users who dont use cloudstorage that much.
            </p>
            <button className="bg-sky-500 rounded h-10 text-white font-semibold text-lg my-4">
              Free
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl dark:text-white font-bold ">0 PLN</h1>
              <p className="text-gray-500 font-bold">/ month</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <BadgeCheck className="text-sky-500" />
                <p className="text-gray-500 font-bold">500MB of storage</p>
              </div>
              <div className="flex gap-2">
                <BadgeX className="text-gray-500" />
                <p className="text-gray-500 font-bold line-through">
                  Mobile app access
                </p>
              </div>
              <div className="flex gap-2">
                <BadgeX className="text-gray-500" />
                <p className="text-gray-500 font-bold line-through">
                  Dedicated support
                </p>
              </div>
            </div>
          </div>
          <div className="border-4 border-sky-500 rounded-lg flex flex-col mx-6 lg:mx-0 p-6">
            <div className="flex items-center justify-between gap-1">
              <h1 className="text-4xl text-sky-500 font-bold">2GB storage</h1>
              <p className="bg-sky-200 rounded-full text-sm text-sky-800 font-bold px-2">
                Recommended
              </p>
            </div>
            <p className="text-lg text-gray-500">
              For users who dont use cloudstorage that much.
            </p>
            <button className="bg-sky-500 rounded h-10 text-white font-semibold text-lg my-4">
              Free
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl dark:text-white font-bold ">0 PLN</h1>
              <p className="text-gray-500 font-bold">/ month</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <BadgeCheck className="text-sky-500" />
                <p className="text-gray-500 font-bold">500MB of storage</p>
              </div>
              <div className="flex gap-2">
                <BadgeX className="text-gray-500" />
                <p className="text-gray-500 font-bold line-through">
                  Mobile app access
                </p>
              </div>
              <div className="flex gap-2">
                <BadgeX className="text-gray-500" />
                <p className="text-gray-500 font-bold line-through">
                  Dedicated support
                </p>
              </div>
            </div>
          </div>
          <div className="border border-gray-500 rounded-lg flex flex-col mx-6 lg:mx-0 p-6">
            <h1 className="text-4xl dark:text-white font-bold">
              Unlimited storage
            </h1>
            <p className="text-lg text-gray-500">
              For advanced projects that require high storage capacity.
            </p>
            <button className="bg-sky-500 rounded h-10 text-white font-semibold text-lg my-4">
              Free
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl dark:text-white font-bold ">Custom</h1>
              <p className="text-gray-500 font-bold">/ month</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex gap-2">
                <BadgeCheck className="text-sky-500" />
                <p className="text-gray-500 font-bold">500MB of storage</p>
              </div>
              <div className="flex gap-2">
                <BadgeCheck className="text-sky-500" />
                <p className="text-gray-500 font-bold ">Mobile app access</p>
              </div>
              <div className="flex gap-2">
                <BadgeCheck className="text-sky-500" />
                <p className="text-gray-500 font-bold h">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
