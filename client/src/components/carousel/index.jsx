import { Carousel } from "@material-tailwind/react";
 
const CustomCarousel = () => {
  return (
    <Carousel transition={{ duration: 2 }} className="rounded-xl ">
      <video className="h-full w-full object-cover rounded-lg max-h-[929px]" autoPlay muted >
        <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <img
        src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
        alt="back1"
        className="h-full w-full object-cover max-h-[929px]"
      />
      <img
        src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
        alt="back2"
        className="h-full w-full object-cover max-h-[929px]"
      />
    </Carousel>
  );
}

export default CustomCarousel;