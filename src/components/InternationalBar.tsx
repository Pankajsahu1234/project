// import React from "react";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";

// const InternationalBar: React.FC = () => {
//   return (
//     <div className="w-full h-200px bg-white border-b border-gray-200 text-sm">
//       <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

//         {/* LEFT: Daraz International + Countries */}
//         <div className="flex items-center gap-6">
//           <span className="font-semibold text-gray-800">
//             Daraz International
//           </span>

//           <div className="flex items-center gap-4">
//             {/* Pakistan */}
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img
//                 src="https://img.lazcdn.com/us/domino/1fe7d756-2469-4d8e-82b2-d5eb7cbad875_PK-84-84.png"
//                 alt="Pakistan"
//                 className="h-4 w-4 rounded-full"
//               />
//               <span>Pakistan</span>
//             </div>

//             {/* Bangladesh */}
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img
//                 src="https://img.lazcdn.com/us/domino/05a4ef2c-095c-407d-9295-aa45b5412de0_PK-84-84.png"
//                 alt="Bangladesh"
//                 className="h-4 w-4 rounded-full"
//               />
//               <span>Bangladesh</span>
//             </div>

//             {/* Sri Lanka */}
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img
//                 src="https://img.lazcdn.com/us/domino/5536488d-c32a-44eb-8307-ed6651d907da_PK-84-84.png"
//                 alt="Sri Lanka"
//                 className="h-4 w-4 rounded-full"
//               />
//               <span>Sri Lanka</span>
//             </div>

//             {/* Myanmar */}
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img
//                 src="https://img.lazcdn.com/us/domino/8896f696-b36f-4cb1-8576-2e86eed05046_PK-84-84.png"
//                 alt="Myanmar"
//                 className="h-4 w-4 rounded-full"
//               />
//               <span>Myanmar</span>
//             </div>

//             {/* Nepal */}
//             <div className="flex items-center gap-1 cursor-pointer">
//               <img
//                 src="https://img.lazcdn.com/us/domino/39f7f111-619f-47cd-993c-a551aaed15fd_PK-86-86.png"
//                 alt="Nepal"
//                 className="h-4 w-4 rounded-full"
//               />
//               <span>Nepal</span>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT: Follow Us + Copyright + Messages */}
//         <div className="flex items-center gap-6">

//           {/* Follow Us */}
//           <div className="flex items-center gap-3">
//             <span className="font-semibold text-gray-800">Follow Us</span>
//             <FaFacebookF className="cursor-pointer text-blue-600" />
//             <FaTwitter className="cursor-pointer text-black" />
//             <FaInstagram className="cursor-pointer text-pink-500" />
//             <FaYoutube className="cursor-pointer text-red-600" />
//           </div>

//           {/* Copyright */}
//           <span className="text-gray-500">
//             © Daraz 2025
//           </span>

//           {/* Messages Button */}
//           <button className="flex items-center gap-2 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100">
//             💬 Messages
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default InternationalBar;




import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';

const DarazFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">

                        {/* Daraz International */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                Daraz International
                            </h3>

                            <div className="flex items-center gap-4">

                                {/* Pakistan */}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.lazcdn.com/us/domino/1fe7d756-2469-4d8e-82b2-d5eb7cbad875_PK-84-84.png"
                                            alt="Pakistan"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700">Pakistan</span>
                                </div>

                                {/* Bangladesh */}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.lazcdn.com/us/domino/05a4ef2c-095c-407d-9295-aa45b5412de0_PK-84-84.png"
                                            alt="Bangladesh"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700">Bangladesh</span>
                                </div>

                                {/* Sri Lanka */}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.lazcdn.com/us/domino/5536488d-c32a-44eb-8307-ed6651d907da_PK-84-84.png"
                                            alt="Sri Lanka"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700">Sri Lanka</span>
                                </div>

                                {/* Myanmar */}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.lazcdn.com/us/domino/8896f696-b36f-4cb1-8576-2e86eed05046_PK-84-84.png"
                                            alt="Myanmar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700">Myanmar</span>
                                </div>

                                {/* Nepal */}
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden">
                                        <img
                                            src="https://img.lazcdn.com/us/domino/39f7f111-619f-47cd-993c-a551aaed15fd_PK-86-86.png"
                                            alt="Nepal"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-gray-700">Nepal</span>
                                </div>

                            </div>
                        </div>

                        {/* Follow Us */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                Follow Us
                            </h3>

                            <div className="flex items-center gap-3">
                                <a className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                    <Facebook className="w-4 h-4 text-white" />
                                </a>
                                <a className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                                    <Twitter className="w-4 h-4 text-white" />
                                </a>
                                <a className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 flex items-center justify-center">
                                    <Instagram className="w-4 h-4 text-white" />
                                </a>

                                
                                <a
                                    href="#"
                                    className="w-8 h-8 bg-orange rounded-full  flex items-center justify-center"
                                >
                                    <img
                                        src="https://img.lazcdn.com/us/domino/6bf9555a-40ae-466d-a756-907f70aa3461_PK-76-76.png"
                                        alt="YouTube"
                                        className="w-4 h-4 object-contain"
                                    />
                                </a>

                            </div>
                        </div>

                    </div>

                    <div className="text-xs text-blue-600 font-medium">
                        © Daraz 2025
                    </div>
                </div>
            </div>

            {/* Floating Message Button */}
            <button className="fixed bottom-6 right-6 bg-white border border-gray-300 shadow-lg rounded-lg px-4 py-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-800">Messages</span>
            </button>
        </footer>
    );
};

export default DarazFooter;
