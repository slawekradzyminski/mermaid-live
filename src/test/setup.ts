import '@testing-library/jest-dom' 

// ResizeObserver polyfill for tests
global.ResizeObserver = class ResizeObserver {
  callback: ResizeObserverCallback
  
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }
  
  observe() {
    // Mock implementation - no-op for tests
  }
  
  unobserve() {
    // Mock implementation - no-op for tests
  }
  
  disconnect() {
    // Mock implementation - no-op for tests
  }
} 