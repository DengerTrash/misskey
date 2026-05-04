import { GalongPlayer } from "./.built/build.js"
const canv = document.getElementById('galongDiv')
const unko = new GalongPlayer(canv)
console.log('unko')

 window.addEventListener('resize', () => {
    unko.resize();
  });
window.addEventListener('DOMContentLoaded',unko.bang())
