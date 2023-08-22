"use client";
import {FaTimes} from "react-icons/fa";
 import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/navigation";
interface EmptyStateprops{
    text?:string
}
const EmptyState:
React.FC<EmptyStateprops>=({
    text
})=> {
    const router=useRouter();
   

  function closeModal() {
    router.push('/documents');
  }

  

  return (
    <>
      

      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div
                    className="
                    w-full 
                    flex flex-row
                    items-center
                    justify-center
                    gap-2">
                   <p>Permision Denied</p>  <FaTimes size={20} color='red' />
                 
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                     You dont have permissions
                     to acces this document,
                     kindly ask the owner of this
                      document to grant you the access!</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="
                      inline-flex
                       justify-center
                        rounded-md
                         border
                          border-transparent
                           bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                    <div
                    className="
                    flex
                    flex-row
                    w-full
                    gap-1
                    items-center
                    ">
                        <p>Home

                        </p>
                        <AiFillHome/>
                        </div>   
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default EmptyState;
