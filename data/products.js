// Product catalog for the Applications tab.
//
// Applications and games appear as cards in the Applications tab;
// extensions appear in the Extensions tab.
//   id          Unique identifier
//   name        Display name
//   type        "application", "game", or "extension"
//   description One to two professional sentences
//   platforms   Any of "windows", "linux", "android", "apple"
//               (extensions use "firefox", "chrome")
//   image       Optional path to a square thumbnail (e.g. "images/my-app.png")
//   links       Optional { learnMore, store, download, source } URLs
//
// Example:
//   {
//     id: "example-app",
//     name: "Example App",
//     type: "application",
//     description: "A short, professional description of the product.",
//     platforms: ["windows", "linux"],
//     image: "",
//     links: { learnMore: "", store: "", download: "" }
//   },

window.PRODUCTS = [
  {
    id: "test-bed",
    name: "Test Bed",
    type: "application",
    description: "View and control multiple Android phones over Wi-Fi from your PC, wirelessly install software, use a phone as an extra monitor, and remotely control other PCs.",
    platforms: ["windows", "linux", "android"],
    image: "",
    links: { source: "https://github.com/PocketStudiosLLC/Test-Bed" }
  },
  {
    id: "dimsplay",
    name: "Dimsplay",
    type: "application",
    description: "Dims your screen below the system's minimum brightness with a translucent overlay, for comfortable viewing in the dark.",
    platforms: ["android"],
    image: "",
    links: { source: "https://github.com/PocketStudiosLLC/Dimsplay" }
  },
  {
    id: "recolor-firefox",
    name: "Recolor for Firefox",
    type: "extension",
    description: "Adds transparency and a customizable background to YouTube and other sites.",
    platforms: ["firefox"],
    image: "",
    links: { source: "https://github.com/PocketStudiosLLC/Firefox-Recolor" }
  },
  {
    id: "recolor-chrome",
    name: "Recolor for Chrome",
    type: "extension",
    description: "Adds transparency and a customizable background to your browsing experience.",
    platforms: ["chrome"],
    image: "",
    links: { source: "https://github.com/PocketStudiosLLC/Recolor-for-Chrome" }
  }
];
