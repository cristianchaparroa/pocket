
const Simulator = () => {

    return (
      <div className="text-white ml-5 mr-5">
        <h1 className="m-5 text-white"> Préstamo </h1>
        <div>
            <div className="w-full mt-7 flex flex-row space-x-5 justify-center">
                <p className="">¿Cuánto necesitas?</p>
                <p className=" text-cyan-500">$1000</p>
            </div>

            <div class="relative ml-5 mr-5" >
                <label for="labels-range-input" class="sr-only">Labels range</label>

                <input
                    id="labels-range-input"
                    type="range"
                    min="100" 
                    max="1500"
                    class="w-full 
                        h-2 rounded-lg 
                        appearance-none 
                        cursor-pointer 
                        dark:bg-gray-400"/>

                <span class="text-sm absolute start-0 -bottom-6">Min ($100)</span>
                <span class="text-sm absolute end-0 -bottom-6 ">Max ($1500)</span>
            </div>

            <div className="w-full mt-14 flex flex-row space-x-5 justify-center">
                <p>¿En cuántos días lo deseas devolver?</p>
                <p class="text-cyan-500">30 días</p>
            </div>
            <div class="relative ml-5 mr-5" >
                <label for="labels-range-input" class="sr-only">Labels range</label>

                <input
                    id="labels-range-input"
                    type="range"
                    min="100" max="1500"
                    class="w-full h-2 rounded-lg appearance-none cursor-pointer dark:bg-gray-400"/>

                <span class="text-sm absolute start-0 -bottom-6">5</span>
                <span class="text-sm absolute end-0 -bottom-6">45</span>
            </div>

            <div className="mt-10">
                <hr class="my-6 dark:border-cyan-800 lg:my-8" />
            </div>

            <div className="mb-3">
                <h1 className="text-white">Resumen</h1>
            </div>
            <div className="w-full flex flex-row space-x-1 justify-center">
                <div className="flex flex-col space-y-1 items-start text-stone-400 mr-20">
                    <p>Fecha de devolución: </p>
                    <p>Valor del préstamo:</p>
                    <p>Intereses del préstamo: </p>
                    <p> Total:</p>
                </div>
                <div className="flex flex-col space-y-1 items-end ml-10">
                    <p>Julio 01 de  2024</p>
                    <p>1000</p>
                    <p>$20</p>
                    <p>$1020</p>
                </div>
            </div>
            <button 
                type="button" 
                className="
                    w-full
                    focus:outline-none 
                    text-white 
                    bg-purple-700 
                    hover:bg-purple-800 
                    font-medium 
                    rounded-lg 
                    text-sm 
                    px-5 
                    py-2.5 
                    mt-10 
                    mb-6
                    dark:bg-purple-600 
                    dark:hover:bg-purple-700 
                    dark:focus:ring-purple-900">Solicitar Ahora</button>
        </div>
      </div>
    );

};

export default Simulator;
