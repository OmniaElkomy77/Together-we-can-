import TrackPlayer, { Event } from "react-native-track-player";

module.exports = async function () {
  TrackPlayer.addEventListener("remote-play", () => TrackPlayer.play());

  TrackPlayer.addEventListener("remote-pause", () => TrackPlayer.pause());

  TrackPlayer.addEventListener("remote-stop", () => TrackPlayer.destroy());

  TrackPlayer.addEventListener(Event.RemotePrevious, async (e: any) => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if (currentTrackIndex > 0) {
      try {
        await TrackPlayer.skipToPrevious();
        console.log("remote previous succeeded");
      } catch {
        console.log("remote previous error");
        console.log(e);
      }
    }
  });

  TrackPlayer.addEventListener(Event.RemoteNext, async (e: any) => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    if (currentTrackIndex < 2) {
      try {
        await TrackPlayer.skipToNext();
        console.log("remote next succeeded");
      } catch {
        console.log("remote next error");
        console.log(e);
      }
    }
  });

  TrackPlayer.addEventListener("remote-seek", async (position) =>
    TrackPlayer.seekTo(position.position)
  );
};

// import TrackPlayer from "react-native-track-player";

// module.exports = async function () {
//   TrackPlayer.addEventListener(
//     "remote-play",
//     async () => await TrackPlayer.play()
//   );

//   TrackPlayer.addEventListener(
//     "remote-pause",
//     async () => await TrackPlayer.pause()
//   );

//   TrackPlayer.addEventListener(
//     "remote-stop",
//     async () => await TrackPlayer.stop()
//   );

//   TrackPlayer.addEventListener("remote-jump-backward", async () => {
//     TrackPlayer.seekTo((await TrackPlayer.getPosition()) - 15);
//   });

//   TrackPlayer.addEventListener("remote-jump-forward", async () => {
//     TrackPlayer.seekTo((await TrackPlayer.getPosition()) + 15);
//   });

//   TrackPlayer.addEventListener(
//     "remote-next",
//     async () => await TrackPlayer.skipToNext()
//   );

//   TrackPlayer.addEventListener(
//     "remote-previous",
//     async () => await TrackPlayer.skipToPrevious()
//   );
// };
