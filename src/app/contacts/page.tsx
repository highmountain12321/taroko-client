"use client"
import React, { useState } from "react";
import Link from "next/link";
import ContactList from "@/components/ContactList";

function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full h-screen bg-white">
      <div className="flex justify-between items-center p-4 border-b border-b-2 border-blue-500 bg-white ">
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="block text-3xl">
            ☰
          </button>
        </div>
        {/* Dropdown menu for mobile */}
        {isMenuOpen && (
            <div className="lg:hidden h-[60px] absolute left-[50px]">
            <div className=" bg-blue-500 text-white border border-gray-300 m-2 p-2 rounded">
                <Link href={"/contacts/add"} className="block text-white hover:underline">
                Add contacts
                </Link>
            </div>
            </div>
        )}
        <Link href={'/'} className="text-2xl font-bold">
          Contact List
        </Link>
        {/* "Add contacts" button always visible on desktop */}
        <div className="hidden lg:block">
          <Link href={"/contacts/add"} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-2">
            Add contacts
          </Link>
        </div>
      </div>
      <ContactList />
      <div id="modal-root"></div>
    </div>
  );
}

export default Page;
