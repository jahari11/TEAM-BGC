import Image from "next/image";

export default function About() {
  return (
    <div>
      {/* About Section */}
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl uppercase font-bold mb-4">Team BGC Origins</h1>
          <p className="text-lg md:text-xl mb-4">
            Gerald “Big G” Campbell Sr. was a beloved figure in Albany, NY, known for his dedication to family, 
            community service, and leadership. As a civil servant with the Albany City Department of Buildings & Codes, 
            Gerald earned a reputation for his diligence and integrity as a Code Enforcement Agent.
          </p>
          <p className="text-lg md:text-xl">
            Since its inception, TEAM BGC has continued to honor Gerald’s legacy, bringing the Albany community together 
            in unity, celebration, and a shared passion for basketball.
          </p>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 h-[350px] md:h-auto relative mt-6 md:mt-0">
          <Image 
            src='/images/BIGG.jpg'
            alt="Big G Classic"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="flex flex-col-reverse md:flex-row w-full min-h-screen">
        {/* Left Image Grid with Tint Overlay */}
        <div className="relative w-full md:w-1/2 h-[350px] md:h-auto">
          {/* Image Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
            {["biggphoto1.jpg", "biggphoto2.jpg", "biggphoto3.png", "biggphoto4.png"].map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <Image src={`/images/${img}`} alt={`G${index + 1}`} fill className="object-cover rounded-md" />
              </div>
            ))}
          </div>

          {/* Overlay (Tint) */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Centered Text on Overlay */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <h2 className="text-white text-2xl md:text-4xl italic font-thin text-center">
              "Sports have the power to change the world. They have the power to inspire. They have the power to unite people in a way that little else does." — Nelson Mandela
            </h2>
          </div>
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 text-center md:text-left mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl uppercase font-bold mb-4">Our Mission</h1>
          <p className="text-lg md:text-xl">
            Our mission is to provide enrichment, athletic opportunities, and community-building activities through 
            basketball tournaments and events, fostering teamwork, leadership, and positive engagement for youth and adults 
            throughout Albany, the Greater Capital District, and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}
