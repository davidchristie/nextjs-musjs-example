declare global {
  class Mus {
    // Starts a recording session for current screen. If there is already a session recorded, it appends to it.
    record(): void;

    // Stops a recording or a playback.
    stop(): void;

    // Plays current recording session.
    play(onfinish: () => void): void;

    // Pauses current playback.
    pause(): void;

    // Releases all data recorded or set.
    release(): void;

    // Returns all data collected during recording.
    getData(): unknown;

    // Sets custom data for playback. It must be a JSON object collected from getData.
    setData(data: unknown): void;

    // Same as setData, but allows only to set the frames array.
    setFrames(frame: unknown): void;

    // During recording, all data collected contains window dimensions as well, so if your recorded data comes from a different window dimension, mus automatically adapts to current window size. This function allows you to set a custom playback window size if you decide to use setFrames instead of setData (that already sets windows dimensions).
    setWindowSize(width: number, height: number): void;

    // Allows playback to be faster or slower. Default constants: mus.speed.SLOW (35), mus.speed.NORMAL (15), mus.speed.FAST (5) You may decide to use custom values as you wish.
    setPlaybackSpeed(speed: number): void;

    // Records time elapsed for each point for a precise data recording. Default: disabled
    setTimePoint(bool: boolean): void;

    // Informs if mus is currently recording something.
    isRecording(): boolean;

    // Informs if mus is currently playing something.
    isPlaying(): boolean;

    // Informs if mus is recording time for each data point.
    isTimePoint(): boolean;
  }
}

export {};
