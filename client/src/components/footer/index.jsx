import { Typography } from "@material-tailwind/react";

import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

const list = ['About us', 'contact us ']

const Footer = () => {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <ChevronDoubleUpIcon className="w-12 h-12" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          {list.map((item) => {
            <li>
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                {item}
              </Typography>
            </li>
          })}
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Material Tailwind
      </Typography>
    </footer>
  );
}

export default Footer;