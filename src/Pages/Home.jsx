import React from 'react'

const Home = () => {
  return (
    
        <div className=' h-screen '>
            <div className='h-screen w-screen'>
                <img className='w-full h-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className=' px-5  border w-full h-screen absolute bottom-0 bg-white border-red-400 '>
                <div className='h-[30%] bg-white'>
        
<input placeholder='Enter Pickup loction' type="text" className=' border mb-10 rounded px-2 py-2 bg-gray-100 w-full outline-none ' />

<input placeholder='Enter Dropoff loction' type="text" className=' border rounded px-2 py-2 bg-gray-100 w-full outline-none ' />
                </div>
                <div className='h-[70%] bg-red-600 flex justify-center items-center'>

                </div>
            </div>
        </div>

    
  )
}

export default Home 