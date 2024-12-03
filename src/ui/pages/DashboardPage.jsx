import React from 'react'
import { NavLink } from "react-router"

export default function DashboardPage() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Dashboard page
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
            numquam ea!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavLink
              to='/'
              className="block w-full rounded bg-secondary-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary-700 focus:outline-none focus:ring active:bg-secondary-500 sm:w-auto"
            >
              Return
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
