// Calculate distance between floors
export const calculateDistance = (currentFloor, targetFloor) => {
  return Math.abs(currentFloor - targetFloor);
};

// Find the nearest available elevator
export const findNearestElevator = (elevators, targetFloor) => {
  const availableElevators = elevators.filter(e => e.status === 'idle');
  
  if (availableElevators.length === 0) return null;
  
  return availableElevators.reduce((nearest, current) => {
    const nearestDistance = calculateDistance(nearest.floor, targetFloor);
    const currentDistance = calculateDistance(current.floor, targetFloor);
    return currentDistance < nearestDistance ? current : nearest;
  });
};

// Calculate movement time based on distance
export const calculateMovementTime = (fromFloor, toFloor) => {
  const distance = calculateDistance(fromFloor, toFloor);
  // 1 second per floor for smooth animation
  return distance * 1000;
};

// Create a movement promise that resolves after the elevator reaches its destination
export const createMovementPromise = (movementTime) => {
  return new Promise(resolve => setTimeout(resolve, movementTime));
};

// Play arrival sound with modern 'ding' effect
export const playArrivalSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

// Update elevator state during movement
export const moveElevator = async (elevator, targetFloor, setElevators) => {
  const movementTime = calculateMovementTime(elevator.floor, targetFloor);
  
  // Start movement
  setElevators(prev => prev.map(e => 
    e.id === elevator.id 
      ? { 
          ...e, 
          status: 'moving',
          floor: targetFloor // Update floor immediately for animation
        }
      : e
  ));

  // Wait for movement to complete
  await createMovementPromise(movementTime);

  // Elevator arrived
  setElevators(prev => prev.map(e => 
    e.id === elevator.id 
      ? { ...e, status: 'arrived' }
      : e
  ));

  // Play arrival sound
  playArrivalSound();

  // Wait 2 seconds
  await createMovementPromise(2000);

  // Reset elevator state
  setElevators(prev => prev.map(e => 
    e.id === elevator.id 
      ? { ...e, status: 'idle' }
      : e
  ));
}; 