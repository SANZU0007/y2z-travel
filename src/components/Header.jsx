import React from 'react';
import Logo from '../assets/brandLogo.png';
import reorder from '../assets/reorder.png';

const Header = () => {
  return (
<div className="flex gap-4 ml-2 mt-2 w-full justify-between items-center">
  <img
    src={Logo}
    alt="Brand Logo"
    className="w-[132px] h-[32px]"
  />
  {/* reorder image hidden on md and larger, visible on small screens */}
  <img
    src={reorder}
    alt="Menu Icon"
    className="w-[25px] h-[25px]  md:hidden"
    style={{ marginRight: '50px' }}
  />
</div>

  );
};

export default Header;
