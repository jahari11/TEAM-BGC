import Image from "next/image";


export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/videos/BGCVIDEO.mp4" type="video/mp4" />
      </video>

      {/* Overlay & Content */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/60 text-white text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4">More than a game</h1>
        <Image 
          src="/images/Logo.png" 
          width={300} 
          height={300} 
          priority 
          alt="Team BGC Logo" 
          className="w-48 md:w-72 h-auto mb-4"
        />
        <p className="text-lg md:text-2xl uppercase tracking-wide">Building community, inspiring the future.</p>
      </div>
      
    </div>
  );
}


