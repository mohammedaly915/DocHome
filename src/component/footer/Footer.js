import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Facebook, Twitter, Shop, WhatsApp } from '@mui/icons-material';
import fullLogo from './fullLogo.png';

const Footer = () => {
  const Specs = [
    {
      title: 'DOCHOME',
      content: ['About US', 'Our Team', 'Contact US', 'FAQS'],
    },
    {
      title: 'Speciality',
      content: ['Physiotherapist', 'Analysis labs', 'Radiology centers'],
    },
    {
      title: 'Search',
      content: ['Speciality', 'Area'],
    },
    {
      title: 'Are You Doctor',
      content: ['Join DocHome As Doctor'],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-5">
      <div className="container mx-auto pt-5 px-2 md:w-3/4">
        <div className="text-center">
          <h1 className="font-bold text-4xl">
            <span className="text-[#376B95]">DOC</span>
            <span className="text-white">HOME</span>
          </h1>
          <div className="w-24 h-1 bg-[#376B95] rounded-full my-2 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
          {Specs.map((spec, index) => (
            <div key={index} className="text-left">
              <h2 className="font-bold text-lg text-white mb-4">{spec.title}</h2>
              <ul className="space-y-2">
                {spec.content.map((item, idx) => (
                  <li key={idx} className="text-gray-400 hover:text-[#376B95]">
                    <Link to="/" className="text-gray-400 hover:text-[#376B95] no-underline">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full h-1 bg-[#376B95] rounded-full mx-auto mt-4"></div>

        <div className="container mx-auto  px-2 md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-center items-center md:col-span-3 md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div className="flex justify-center space-x-4">
                <Link to="/" className="text-white ">
                  <Apple className=" hover:text-[#376B95]"/>
                </Link>
                <Link to="/" className="text-white hover:text-[#376B95]">
                  <Facebook className=" hover:text-[#376B95]"/>
                </Link>
                <Link to="/" className="text-white hover:text-[#376B95]">
                  <Twitter className=" hover:text-[#376B95]"/>
                </Link>
                <Link to="/" className="text-white hover:text-[#376B95]">
                  <Shop className=" hover:text-[#376B95]" />
                </Link>
                <Link to="/" className="text-white hover:text-[#376B95]">
                  <WhatsApp />
                </Link>
              </div>
              <div className="flex justify-center">
                <img className="w-40" src={fullLogo} alt="Full Logo" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-300">2024 © All rights reserved by</p>
                <h6 className="font-bold text-lg">
                  <span className="text-[#376B95]">DOC</span>HOME
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
