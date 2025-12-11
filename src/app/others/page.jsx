/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import ceo from "../../assets/ceo.webp";
import leftLight from "@/assets/leftGradient.webp";
import rightLight from "@/assets/rightGradient.webp";
import { FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaAward, FaRocket, FaUsers, FaHeart } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-3 sm:mb-4">
            <FaAward className="text-yellow-400 text-xs sm:text-sm" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">Meet Our Visionary Leader</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
            Behind eConnect
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Crafting the future of social connectivity with innovation and passion
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column - CEO Profile Card */}
            <div className="lg:col-span-2">
              <div className="relative group">
                {/* Glowing Border Effect */}
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-xl sm:rounded-2xl blur opacity-20 sm:opacity-30 group-hover:opacity-40 sm:group-hover:opacity-50 transition duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900/90 to-[#1E293B]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-lg sm:shadow-2xl overflow-hidden">
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
                      {/* CEO Image with Floating Badge */}
                      <div className="relative mx-auto md:mx-0">
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-lg">
                          <Image 
                            src={ceo} 
                            alt="MD. Saroar Jahan" 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"></div>
                        </div>
                        
                        {/* Floating Badge */}
                        <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <FaRocket className="text-xs" />
                            <span className="text-xs sm:text-sm font-semibold">CEO & Founder</span>
                          </div>
                        </div>
                      </div>

                      {/* CEO Info */}
                      <div className="flex-1">
                        <div className="mb-4 sm:mb-6">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                            MD. Saroar Jahan
                          </h2>
                          <p className="text-cyan-400 font-medium text-sm sm:text-base mb-1">
                            Founder & CEO • eConnect
                          </p>
                          <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                            <FaUsers className="text-cyan-400 text-sm" />
                            <span>Leading a team of 50+ innovators</span>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                          <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50">
                            <div className="text-xl sm:text-2xl font-bold text-white">5+</div>
                            <div className="text-xs sm:text-sm text-gray-400">Years Experience</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50">
                            <div className="text-xl sm:text-2xl font-bold text-white">50K+</div>
                            <div className="text-xs sm:text-sm text-gray-400">Users Connected</div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="mb-6 sm:mb-8">
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Connect with CEO</h3>
                          <div className="flex gap-3 sm:gap-4 flex-wrap">
                            {[
                              { icon: FaLinkedin, color: "bg-blue-600", label: "LinkedIn" },
                              { icon: FaTwitter, color: "bg-cyan-500", label: "Twitter" },
                              { icon: FaInstagram, color: "bg-pink-600", label: "Instagram" },
                              { icon: FaGlobe, color: "bg-purple-600", label: "Website" },
                            ].map((social, index) => (
                              <a
                                key={index}
                                href="#"
                                className={`${social.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg`}
                                aria-label={social.label}
                              >
                                <social.icon className="text-lg sm:text-xl" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quote Section */}
                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700/50">
                      <div className="relative">
                        <FaHeart className="absolute -top-2 -left-2 text-red-400/30 text-2xl sm:text-3xl md:text-4xl" />
                        <blockquote className="text-base sm:text-lg md:text-xl italic text-gray-300 pl-6 sm:pl-8">
                          "eConnect isn't just another social platform—it's a movement to bring people closer through technology, empathy, and shared experiences."
                        </blockquote>
                        <div className="text-right mt-3 sm:mt-4">
                          <span className="text-cyan-400 font-semibold text-sm sm:text-base">— MD. Saroar Jahan</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Platform Stats & Tech */}
            <div className="space-y-6 sm:space-y-8">
              {/* Platform Stats */}
              <div className="bg-gradient-to-br from-gray-900/90 to-[#1E293B]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-lg sm:shadow-xl p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <FaRocket className="text-cyan-400 text-lg sm:text-xl" />
                  Platform Statistics
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { label: "Active Users", value: "50K+", color: "from-cyan-500 to-blue-500" },
                    { label: "Daily Posts", value: "10K+", color: "from-purple-500 to-pink-500" },
                    { label: "Connections Made", value: "1M+", color: "from-green-500 to-emerald-500" },
                    { label: "Countries", value: "120+", color: "from-orange-500 to-red-500" },
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                      <span className="text-gray-300 text-sm sm:text-base">{stat.label}</span>
                      <span className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-gradient-to-br from-gray-900/90 to-[#1E293B]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-lg sm:shadow-xl p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <SiNextdotjs className="text-white text-lg sm:text-xl" />
                  Built With Excellence
                </h3>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { icon: SiNextdotjs, label: "Next.js", color: "bg-white text-black" },
                    { icon: SiTailwindcss, label: "Tailwind", color: "bg-cyan-500" },
                    { icon: SiMongodb, label: "MongoDB", color: "bg-green-500" },
                  ].map((tech, index) => (
                    <div key={index} className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/30 border border-gray-700/30">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md sm:rounded-lg ${tech.color} flex items-center justify-center text-white`}>
                        <tech.icon className="text-xl sm:text-2xl" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 text-center">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Statement */}
              <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-cyan-500/20 shadow-lg sm:shadow-xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  To create a digital ecosystem where meaningful connections thrive, powered by cutting-edge technology and human-centric design.
                </p>
              </div>
            </div>
          </div>

          {/* CEO Message */}
          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-gray-900/90 to-[#1E293B]/90 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-gray-700/50 shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">A Message from Our CEO</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                Welcome to eConnect—a platform born from a simple yet powerful vision: to bridge distances and bring people together in meaningful ways. 
                In today's fast-paced digital world, we often find ourselves more connected yet more isolated than ever before.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                At eConnect, we're building more than just a social network. We're creating a community where every interaction matters, 
                where technology serves humanity, and where everyone has a voice. Our platform combines cutting-edge features with 
                intuitive design to ensure that connecting with others feels natural, safe, and rewarding.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                Whether you're here to share your passions, discover new interests, or build lasting relationships, 
                eConnect is your space. Thank you for being part of our journey to make the world a little more connected, 
                one conversation at a time.
              </p>
            </div>
            <div className="text-center mt-6 sm:mt-8">
              <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm sm:text-base">
                <FaHeart className="text-red-400" />
                <span>Building Connections That Matter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating CTA Button - Hidden on small screens, visible on medium+ */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
            <FaRocket className="text-sm sm:text-base" />
            <span className="hidden sm:inline">Join eConnect Today</span>
            <span className="sm:hidden">Join Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;