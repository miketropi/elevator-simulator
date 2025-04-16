import { useState, useEffect } from 'react'
import './App.css'
import { findNearestElevator, moveElevator } from './utils/elevatorController'

function App() {
  // State for elevators: position, status, and color
  const [elevators, setElevators] = useState([
    { id: 1, floor: 0, status: 'idle', color: 'black', position: 0 },
    { id: 2, floor: 0, status: 'idle', color: 'black', position: 0 },
    { id: 3, floor: 0, status: 'idle', color: 'black', position: 0 },
    { id: 4, floor: 0, status: 'idle', color: 'black', position: 0 },
    { id: 5, floor: 0, status: 'idle', color: 'black', position: 0 }
  ]);

  // Calculate elevator position style
  const getElevatorStyle = (elevator) => {
    const floorHeight = 88; // Height of each floor in pixels (matches our UI spacing)
    return {
      transform: `translateY(${(9 - elevator.floor) * floorHeight}px)`,
      transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // State for floor buttons
  const [floorButtons, setFloorButtons] = useState(
    Array(10).fill().map((_, i) => ({
      floor: i,
      status: 'idle',
      text: 'call',
      color: 'green'
    }))
  );

  // Queue for elevator calls
  const [callQueue, setCallQueue] = useState([]);

  // Process the elevator queue
  useEffect(() => {
    const processQueue = async () => {
      if (callQueue.length > 0) {
        const targetFloor = callQueue[0];
        const nearestElevator = findNearestElevator(elevators, targetFloor);

        if (nearestElevator) {
          // Remove the current call from queue
          setCallQueue(prev => prev.slice(1));

          // Move the elevator
          await moveElevator(nearestElevator, targetFloor, setElevators);

          // Update button state
          setFloorButtons(prev => prev.map(btn => 
            btn.floor === targetFloor 
              ? { ...btn, status: 'idle', text: 'call', color: 'green' }
              : btn
          ));
        }
      }
    };

    processQueue();
  }, [callQueue, elevators]);

  // Function to handle elevator calls
  const handleCall = (floorNum) => {
    // Update button state
    setFloorButtons(prev => prev.map(btn => 
      btn.floor === floorNum 
        ? { ...btn, status: 'waiting', text: 'waiting', color: 'red' }
        : btn
    ));

    // Add to queue if not already present
    setCallQueue(prev => {
      if (!prev.includes(floorNum)) {
        return [...prev, floorNum];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Elevator System</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="space-y-6 relative">
            {/* Elevator shafts (background) */}
            <div className="absolute inset-x-[120px] top-0 bottom-0 flex justify-center gap-4 pointer-events-none">
              {elevators.map((_, index) => (
                <div key={index} className="w-10 bg-gray-50 rounded-full"></div>
              ))}
            </div>

            {/* Elevators (moving elements) */}
            <div className="absolute inset-x-[120px] top-0 flex justify-center gap-4 pointer-events-none">
              {elevators.map((elevator) => (
                <div
                  key={elevator.id}
                  className="w-10 h-10 rounded-full shadow-lg transition-colors duration-300"
                  style={{
                    ...getElevatorStyle(elevator),
                    backgroundColor: elevator.status === 'idle' ? '#1a1a1a' :
                                   elevator.status === 'moving' ? '#ef4444' : '#22c55e'
                  }}
                />
              ))}
            </div>

            {/* Floors */}
            {[...Array(10)].reverse().map((_, index) => {
              const floorNum = 9 - index;
              const floorName = floorNum === 0 ? 'Ground Floor' : `${floorNum}${floorNum === 1 ? 'st' : floorNum === 2 ? 'nd' : floorNum === 3 ? 'rd' : 'th'}`;
              
              return (
                <div key={floorNum} 
                  className="grid grid-cols-[120px_1fr_120px] items-center gap-6 border-b border-gray-100 py-4 last:border-b-0">
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-600">{floorName}</span>
                  </div>
                  
                  <div className="h-10" /> {/* Spacer for elevator area */}

                  <button
                    className={`
                      px-4 py-2 rounded-lg font-medium text-sm text-white
                      transition-all duration-300 transform hover:scale-105
                      ${floorButtons[floorNum].status === 'idle'
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-red-500'
                      }
                      disabled:opacity-75 disabled:cursor-not-allowed
                    `}
                    onClick={() => handleCall(floorNum)}
                    disabled={floorButtons[floorNum].status === 'waiting'}
                  >
                    {floorButtons[floorNum].text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Queue Display */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Call Queue</h2>
          <div className="flex gap-2">
            {callQueue.length === 0 ? (
              <span className="text-gray-500">No pending calls</span>
            ) : (
              callQueue.map((floor, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {floor === 0 ? 'G' : floor}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
