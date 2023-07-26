import React from "react";
import Typewriter from "typewriter-effect";
import { handleLogin } from "./Navbar";

export const NoUser = () => {
  return (
    <section className="px-[5%]">
      <h1 className="text-center font-semibold text-3xl text-primary mt-5">
        Hello 😍🤟{" "}
        <Typewriter
          options={{
            strings: [
              "Song Nerd",
              "Tune Addict",
              "Beat Fan",
              "Spotify Geek",
              "Jam Freak",
              "Melody Nut",
              "Music Buff",
              "Sing Enthusiast",
              "Track Devotee",
              "Groove Junkie",
              "Lyric Fiend",
              "DJ Bug",
              "Rap Freak",
              "Pophead",
              "Rhythm Maniac",
              "Music Lover",
              "Spotify addict",
              "Beat artist",
              "dreams in song",
            ],
            autoStart: true,
            loop: true,
            cursor: "",
          }}
        />
      </h1>

      <p className="mt-4">
        By now i bet you have a catalogue of spotify playlists 🤨
      </p>
      <p className="mt-4">
        Mixine is a place where you can view your spotify personal and featured
        playlists on video!
      </p>
      <p className="mt-4">
        Harnessing the power of youtube and spotify to deliver a beautiful music
        experience
      </p>
      <p className="mt-4">
        All you need to do is{" "}
        <span
          className="text-primary font-medium cursor-pointer"
          onClick={handleLogin}
        >
          login
        </span>{" "}
        with your spotify account and off you go 🚀 rocketman or woman 😛. For
        absolutely free!!!! No premium subs or anything. Free for life.
      </p>
      <p className="mt-4">
        Due to the limit to the number of calls we can make to youtube the app
        saves some youtube info. (Not your personal info) . So the app gets
        better as people use it. Feel free to share it so that you can get your
        friends to use it!
      </p>
      <p className="mt-4">Have fun! 🎉</p>
    </section>
  );
};
