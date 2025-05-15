export function simulateLatency(ms = 100) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
