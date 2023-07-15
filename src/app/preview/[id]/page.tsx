import Image from "next/image";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="relative md:h-[40rem] min-h-[30rem] w-[50rem]">
        <Image
          sizes="100vw"
          src={`/api/public/${params.id}`}
          fill
          className="object-contain"
          alt="preview"
        />
      </div>
    </div>
  );
};

export default page;
