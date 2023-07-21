import Heading from "@/components/ui/Heading";
import Image from "next/image";
import QRCode from "react-qr-code";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center mt-6">
        <div className="relative md:h-[40rem] min-h-[30rem] w-full">
          <Image
            sizes="100vw"
            src={`/api/public/${params.id}`}
            fill
            className="object-contain"
            alt="preview"
          />
        </div>
      </div>
      <div className="flex gap-4 max-w-3xl my-6 w-full mx-auto px-3 py-3 bg-sky-500 rounded-xl">
        <QRCode
          className="bg-white p-2 rounded-xl md:w-auto  w-1/2"
          size={105}
          bgColor="transparent"
          value={(process.env.NEXTAUTH_URL as string) + "/preview/" + params.id}
        />
        <div className="flex flex-col justify-center">
          <Heading className="text-gray-200" size="xl" weight="extrabold">
            Scan QR code
          </Heading>
          <Heading className="text-gray-200" size="lg">
            Scan this code to get the link of the image preview.
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default page;
