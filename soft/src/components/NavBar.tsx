import React from "react";
import styled from "styled-components"

export function Navbar() {
  return (
    <div className="navbar bg-base-100 my-1.5">
        <a className="btn btn-ghost text-xl" style={{marginLeft: "4%"}}>ToughTalks</a>
        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Get In Touch
        </button>
    </div>
  );
}