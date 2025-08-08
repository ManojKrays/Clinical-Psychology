import String from "@/utils/String";
import {
  Brain,
  Heart,
  Briefcase,
  Lightbulb,
  Handshake,
  Laptop,
  Users,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import React from "react";

const Aboutus = () => {
  const valuesData = [
    {
      title: String.VALUES_COMPASSION,
      desc: String.VALUES_COMPASSION_BODY,
      icon: <Heart className="text-pink-500 text-3xl" />,
    },
    {
      title: String.VALUES_ACCESSIBILITY,
      desc: String.VALUES_ACCESSIBILITY_BODY,
      icon: <ShieldCheck className="text-green-500 text-3xl" />,
    },
    {
      title: String.VALUES_CONFIDENTIALITY,
      desc: String.VALUES_CONFIDENTIALITY_BODY,
      icon: <Briefcase className="text-blue-500 text-3xl" />,
    },
    {
      title: String.VALUES_PROFESSIONALISM,
      desc: String.VALUES_PROFESSIONALISM_BODY,
      icon: <Users className="text-yellow-500 text-3xl" />,
    },
    {
      title: String.VALUES_EMPOWERMENT,
      desc: String.VALUES_EMPOWERMENT_BODY,
      icon: <Lightbulb className="text-purple-500 text-3xl" />,
    },
  ];

  const helpData = [
    {
      title: String.HELP_MATCHING,
      desc: String.HELP_MATCHING_BODY,
      icon: <Handshake className="text-indigo-500 text-3xl" />,
    },
    {
      title: String.HELP_SESSIONS,
      desc: String.HELP_SESSIONS_BODY,
      icon: <Laptop className="text-cyan-500 text-3xl" />,
    },
    {
      title: String.HELP_SUPPORT,
      desc: String.HELP_SUPPORT_BODY,
      icon: <Brain className="text-red-500 text-3xl" />,
    },
    {
      title: String.HELP_GROWTH,
      desc: String.HELP_GROWTH_BODY,
      icon: <TrendingUp className="text-orange-500 text-3xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 pt-20">
      <section className="bg-gradient-to-r from-blue-200 to-blue-50 py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          {String.ABOUT_TITLE}
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          {String.ABOUTINTROBODY}
        </p>
      </section>

      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">
          {String.WHO_WE_ARE_TITLE}
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {String.WHO_WE_ARE_BODY}
        </p>
      </section>

      <section className="bg-white py-16 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="p-6 border-l-4 border-blue-400 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              {String.MISSION_TITLE}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {String.MISSIONBODY}
            </p>
          </div>
          <div className="p-6 border-l-4 border-green-400 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              {String.VISION_TITLE}
            </h3>
            <p className="text-gray-700 leading-relaxed">{String.VISIONBODY}</p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          {String.VALUES_TITLE}
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {valuesData.map((value, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <div className="mb-4">{value.icon}</div>
              <h4 className="text-xl font-semibold text-blue-700 mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-blue-50 py-16 px-6 md:px-20">
        <h3 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          {String.HOW_WE_HELP_TITLE}
        </h3>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {helpData.map((help, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <div className="mb-4">{help.icon}</div>
              <h4 className="text-xl font-semibold text-blue-700 mb-2">
                {help.title}
              </h4>
              <p className="text-gray-600">{help.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-blue-800 mb-10 text-center">
          {String.WHY_CHOOSE_TITLE}
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg max-w-3xl mx-auto">
          {String.WHY_CHOOSE_LIST.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Aboutus;
