const AdsSection = () => {
  return (
    <div className=" p-4">
      <div className="container mx-auto flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* First Column */}
        <div className="md:w-1/2 relative rounded-lg overflow-hidden">
          <img src="/images/hero5.jpg" alt="Ad 1" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col justify-start items-end p-4  bg-opacity-20 bg-black">
            <h2 className="text-3xl drop-shadow md:text-4xl text-right uppercase font-bold mb-2 text-orange-500">
              Discover the <br />
              Latest Fashion
            </h2>
          </div>
        </div>

        {/* Second Column */}
        <div className="md:w-1/2 relative rounded-lg overflow-hidden">
          <img src="/images/hero6.jpg" alt="Ad 2" className="w-full h-auto" />
          <div className="absolute inset-0 flex flex-col justify-end items-start p-4  bg-opacity-20 bg-black">
            <h2 className="text-3xl  md:text-4xl text-left uppercase font-bold mb-2 text-orange-500">
              Upgrade
              <br /> Your Footwear
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;
