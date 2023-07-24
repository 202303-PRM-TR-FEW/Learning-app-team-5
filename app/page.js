
import Link from "next/link"

export default function Home() {
  return (
    <main className="h-screen m-auto max-w-[80%] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center 
       shadow-2xl rounded-[50px] bg-slate-50 
       md:flex-row ">
        <div className=' flex flex-col items-start mx-auto  container px-4 md:pl-36 '>
          <div className=' flex flex-row py-4 mt-4 items-center md:py-10 '>

            <svg
              className="w-[3em] h-[2em] px-[1em] py-[0.3em] lg:w-[4em] lg:h-[2m] lg:px-[1em] lg:py-[0.4em] bg-blue-500 rounded-[20px] overflow-visible z-[1] fill-white"
              viewBox="0 0 576 512"
            >
              <path d="M575.81 217.98C572.64 157.41 518.28 112 457.63 112h-9.37c-52.82 0-104.25-16.25-147.74-46.24-41.99-28.96-96.04-41.62-153.21-28.7C129.3 41.12-.08 78.24 0 224c.04 70.95 38.68 132.8 95.99 166.01V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-54.26c15.36 3.96 31.4 6.26 48 6.26 5.44 0 10.68-.73 16-1.18V464c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-59.43c14.24-5.06 27.88-11.39 40.34-19.51C342.07 355.25 393.86 336 448.46 336c25.48 0 16.01-.31 23.05-.78l74.41 136.44c2.86 5.23 8.3 8.34 14.05 8.34 1.31 0 2.64-.16 3.95-.5 7.09-1.8 12.05-8.19 12.05-15.5 0 0 .14-240.24-.16-246.02zM463.97 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm80 153.25l-39.86-73.08c15.12-5.83 28.73-14.6 39.86-25.98v99.06z"></path>
            </svg>

            <p className='text-primaryBlue py-3 px-4 font-bold'>LearnU</p>
          </div>

          <h1 className='text-5xl font-bold text-[#413F42] py-6'>Discover passion</h1>
          <p className='text-gray-600 max-w-full md:max-w-[70%]'>Find out what topics you find interesting, learn a new skill & connect with people that are passionate about similar topics.</p>
          <Link href="/home">
            <div className='py-10'>
              <button
                className='bg-primaryBlue hover:bg-blue-500 text-white font-bold  py-2 px-8 rounded-xl'>
                GET STARTED
              </button>
            </div>
          </Link>
        </div>
        <div className='bg-white dark:bg-[#183460] rounded-[50px] shadow-xl max-w-full order-first md:order-last'>
          <img src="https://assets.api.uizard.io/api/cdn/stream/a8ce660d-47da-404a-b3b3-63ca6970ddcf.png" alt="Learn U logo " />
        </div>
      </div>
    </main>
  )
}
