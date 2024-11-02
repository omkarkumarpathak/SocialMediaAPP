import React from 'react'

function Footer() {
    return (
        <footer className='bg-blue-900 flex justify-center
    p-6'>
            <div className='w-[80%] flex justify-between items-start md:items-center flex-col md:flex-row  text-gray-50 space-y-7 '>
                <div className='flex flex-col md:flex-col p-3'>
                    <h3>Code_helping</h3>
                    <p className='text-sm mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima fugiat in voluptatem laudantium non alias!</p>
                </div>

                <div className='flex text-sm md:text-md space-x-9 p-3'>
                    <div>
                        <h3>Product</h3>

                        <div className='mt-5   '>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                        </div>

                    </div>

                    <div>
                        <h3>Product</h3>
                        <div className='mt-5 text-sm '>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                        </div>
                    </div>

                    <div>
                        <h3>Product</h3>
                        <div className='mt-5 text-sm '>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                            <div>MDBootstrap</div>
                        </div>
                    </div>
                </div>


            </div>
        </footer>
    )
}

export default Footer
