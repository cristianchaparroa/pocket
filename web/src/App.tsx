import './App.css'
import Simulator from './components/simulator'


function App() {
  return (
    <div>
        <h1 className="text-3xl font-bold text-white mt-19 font-mono">My Pocket</h1>
        <div className="w-full h-full flex flex-row space-x-5 mt-10 justify-center m-5">
            <div className="w-full flex flex-col justify-center items-center mr-20">
                <p className="text-neutral-300 text-4xl">
                    Préstamo online rápidos y sin tanto papeleo, Solicítalo  ya! 
                </p>
            </div>
            
            <div style={{backgroundColor: "#334155"}} className="w-full h-800 shadow-2xl rounded-xl">
                <Simulator/>
            </div>
        </div>
    </div>
  )
}

export default App
