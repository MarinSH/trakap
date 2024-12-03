import React from 'react'
import { NavLink } from "react-router"

export default function HomePage() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Template
            <strong className="font-extrabold text-secondary-700 sm:block">Electron + React</strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
            numquam ea!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavLink
              to="/dashboard"
              className="btn btn-primary"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className="btn"
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}
