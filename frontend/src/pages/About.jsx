import React from "react";
import Title from "../components/Title/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
            totam suscipit distinctio ea provident, beatae dolorem soluta ipsum
            laborum amet tempore consequatur veritatis praesentium aliquid
            deleniti minus expedita cupiditate assumenda.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
            voluptate.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis
            corrupti ratione non laborum! Quam, a. Consequatur harum temporibus
            fugiat modi!
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum
            rem aspernatur praesentium tenetur pariatur illum alias, voluptates
            illo nobis.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum
            rem aspernatur praesentium tenetur pariatur illum alias, voluptates
            illo nobis.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum
            rem aspernatur praesentium tenetur pariatur illum alias, voluptates
            illo nobis.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
