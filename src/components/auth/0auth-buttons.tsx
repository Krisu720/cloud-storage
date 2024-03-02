import Image from 'next/image'
import React from 'react'

const AuthButtons = () => {
  return (
    <>
       {/* <button className="inline-flex items-center my-0.5 mt-2 rounded-xl gap-2 bg-secondary py-2 justify-center ">
        <div className="aspect-square  bg-white p-1 rounded-full">
          <Image src="/google.png" alt="google image" height={5} width={20} />
        </div>{" "}
        Continue with google
      </button> */}
      <a
        href="/api/login/github"
        className="inline-flex items-center my-0.5 rounded-xl gap-2 bg-secondary py-2 justify-center "
      >
        <div className="aspect-square bg-white  p-1 rounded-full">
          <Image src="/github.png" alt="github image" height={5} width={20} />
        </div>{" "}
        Continue with github
      </a></>
  )
}

export default AuthButtons