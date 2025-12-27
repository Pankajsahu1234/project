


import React from 'react';

const Footer: React.FC = () => {
  return (
    // <footer className="bg-gray-50 py-10 px-6 md:px-12 lg:px-20">
    <footer className="bg-gray-50 py-6 px-6 md:px-12 lg:px-20">

      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 border-b border-gray-200 pb-10">
          {/* Customer Care */}
          <div>
            <h3 className="font-bold text-blue-800 ">Customer Care</h3>
            <ul className="space-y-0.5 text-sm">
              <li><a href="#" className="text-blue-800 hover:underline">Help Center</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">How to Buy</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Corporate & Bulk Purchasing</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Returns & Refunds</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz Shop</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Contact Us</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Purchase Protection</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz Pick up Points</a></li>
            </ul>
          </div>

          {/* Daraz */}
          <div>
            <h3 className="font-bold text-blue-800 ">Daraz</h3>
            <ul className="space-y-0.5 text-sm">
              <li><a href="#" className="text-blue-800 hover:underline">About Us</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Digital Payments</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz Donates</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz Blog</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Privacy Policy</a></li>
              <li className="text-blue-800">NTN Number: 4012116-6</li>
              <li className="text-blue-800">STRN Number: 1700401211818</li>
              <li><a href="#" className="text-blue-800 hover:underline">Online Shopping App</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Online Grocery Shopping</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz Exclusive</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Daraz University</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Sell on Daraz</a></li>
              <li><a href="#" className="text-blue-800 hover:underline">Join Daraz Affiliate Program</a></li>
            </ul>
          </div>

          {/* Happy Shopping & App Download */}
          <div className="flex items-start gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://img.lazcdn.com/us/domino/e07f9602-da7e-4d31-9c4f-df69a2e95325_PK-60-60.png"
                alt="Daraz Logo"
                className="h-14 w-14"
              />
              <div>
                <p className="text-orange-500 font-bold text-lg">Happy Shopping</p>
                <p className="text-gray-700 text-sm">Download App</p>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col gap-3">
              <img
                src="https://img.lazcdn.com/us/domino/2db6633b-c83c-48b7-9f7d-1262ee87cc80_PK-126-42.png"
                className="h-10"
              />
              <img
                src="https://img.lazcdn.com/us/domino/4812f06f-072d-45be-a930-640edf4caeee_PK-126-42.png"
                className="h-10"
              />
              <img
                src="https://img.lazcdn.com/us/domino/7d216fe8-1bac-4ac9-81d3-072a9fbf32fc_PK-126-42.png"
                className="h-10"
              />
            </div>
          </div>


          {/* Empty column on large screens to push alignment if needed */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Bottom Section - Payment Methods & Verified */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-8">

          <div>
            <p className="text-gray-700 font-semibold mb-6">Payment Methods</p>

            {/* Row 1 */}
            <div className="flex flex-wrap gap-6 mb-4">
              <img src="https://img.lazcdn.com/us/domino/ee9913f8-8258-4382-b97e-e2047ce93012_PK-139-84.png" className="h-10" />
              <img src="https://img.lazcdn.com/us/domino/78355368-8518-4b88-9f8e-e5751ee0863a_PK-140-84.png" className="h-8" />
              <img src="https://img.lazcdn.com/us/domino/5ba8a652-1445-45cb-a2a5-ed6043004243_PK-63-48.png" className="h-8" />
              <img src="https://img.lazcdn.com/us/domino/dd8e0447-8052-44f3-8ab2-b24c56a2491f_PK-139-84.png" className="h-10" />
              <img src="https://img.lazcdn.com/us/domino/e5c3cd93-b796-410f-9bfd-fbfdaa055149_PK-144-84.png" className="h-10" />
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap gap-6">
              <img src="https://img.lazcdn.com/us/domino/75489476-3c86-44ed-bf81-8b0579d56e1c_PK-139-84.png" className="h-10" />
              <img src="https://img.lazcdn.com/us/domino/6668ff96-bf9a-40bd-8ce4-f7f7c0bee385_PK-144-84.png" className="h-10" />
              <img src="https://img.lazcdn.com/us/domino/7237a412-04cc-4571-a200-44f6f847a9da_PK-144-84.png" className="h-10" />
            </div>
          </div>


          <div className="text-left text-left">
            <p className="text-gray-700 font-semibold mb-2">Verified by</p>
            <img
              src="https://img.drz.lazcdn.com/g/tps/imgextra/i4/O1CN01ZaMORP1I3qlBom0V2_!!6000000000838-2-tps-73-41.png"
              alt="PCI DSS Compliant"
              className="h-16 inline-block"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;